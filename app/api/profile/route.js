import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "../../../lib/supabaseClient";

export async function POST(request) {
  try {
    const requestData = await request.json();
    const { category, answers } = requestData;

    if (!category || !answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.8-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const buildPrompt = (thinSections = null) => {
      const expansionNote = thinSections
        ? `\n\nSome sections were too short. You MUST rewrite these sections with much more depth: ${thinSections.map(s => `"${s}"`).join(", ")}. Each must be at least 150 words.\n`
        : "";

      // PART 1 — Instructions only (no placeholder text inside schema)
      const instructions = `You are an expert taste profiler. A user completed a taste quiz in the ${category} category.

Their answers: ${JSON.stringify(answers)}
${expansionNote}
Generate a taste profile JSON. Critical rules:
- Each section body MUST be 4-6 full sentences
- Write in second person (you, your)
- Reference their specific answers directly
- Be psychological, vivid, and surprisingly accurate
- Make each body feel like a personalized horoscope
- Minimum 150 words per section body

Colors must reflect emotional tone:
- Dark, intense, psychological -> deep purples, crimsons, near blacks
- Adventurous, bold, energetic -> electric orange, teal, acid green
- Warm, social, feel-good -> amber, gold, coral
- Intellectual, curious, complex -> midnight blue, silver, deep teal`;

      // PART 2 — Clean JSON schema with empty strings only (no instructions inside)
      const schema = `Return raw JSON only, no markdown, no code blocks:
{
  "archetype": "",
  "tagline": "",
  "sections": [
    { "heading": "What drives you", "body": "" },
    { "heading": "Your signature taste", "body": "" },
    { "heading": "What makes you unique", "body": "" }
  ],
  "traits": ["", "", ""],
  "recommendations": [
    { "title": "", "reason": "" },
    { "title": "", "reason": "" },
    { "title": "", "reason": "" },
    { "title": "", "reason": "" },
    { "title": "", "reason": "" }
  ],
  "colors": ["", "", ""],
  "oneliner": ""
}`;

      return `${instructions}\n\n${schema}`;
    };

    const callGeminiWithRetry = async (promptText, maxAttempts = 3) => {
      let lastError;
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          return await model.generateContent(promptText);
        } catch (err) {
          lastError = err;
          console.warn(`[profile API] Gemini call attempt ${attempt} failed: ${err.message}`);
          if (attempt < maxAttempts) {
            await new Promise(res => setTimeout(res, 1000 * attempt));
          }
        }
      }
      throw lastError;
    };

    // --- First call ---
    let profileData;
    try {
      const result = await callGeminiWithRetry(buildPrompt());
      let responseText = result.response.text();
      responseText = responseText.replace(/```json/gi, "").replace(/```/g, "").trim();
      profileData = JSON.parse(responseText);

      // --- Log character counts to confirm section depth ---
      console.log("[profile] Section body character counts (first call):");
      (profileData.sections || []).forEach(s => {
        const count = s.body?.length || 0;
        const status = count >= 500 ? "✅" : "❌ TOO SHORT";
        console.log(`  "${s.heading}": ${count} chars ${status}`);
      });

      // --- Validation: check if any section body is too short ---
      const MIN_CHARS = 100;
      const thinSections = (profileData.sections || [])
        .filter(s => !s.body || s.body.length < MIN_CHARS)
        .map(s => s.heading);

      if (thinSections.length > 0) {
        console.warn(`[profile] Thin sections detected (< ${MIN_CHARS} chars): ${thinSections.join(", ")}. Retrying with expansion prompt.`);
        try {
          const retryResult = await callGeminiWithRetry(buildPrompt(thinSections), 2);
          let retryText = retryResult.response.text();
          retryText = retryText.replace(/```json/gi, "").replace(/```/g, "").trim();
          const retryData = JSON.parse(retryText);

          profileData.sections = profileData.sections.map(section => {
            if (thinSections.includes(section.heading)) {
              const expanded = retryData.sections?.find(s => s.heading === section.heading);
              return expanded || section;
            }
            return section;
          });
        } catch (retryErr) {
          console.warn("[profile API] Expansion prompt retry failed, continuing with initial profile:", retryErr.message);
        }
      }
    } catch (genError) {
      console.error("[profile API] All Gemini API attempts failed. Using high-quality fallback profile:", genError.message);
      profileData = {
        archetype: "The Eclectic Connoisseur",
        tagline: `A distinct and passionate explorer of all things ${category}.`,
        sections: [
          { heading: "What drives you", body: "You are driven by authenticity and emotional depth. Rather than following mainstream trends passively, you seek out experiences that resonate with your inner values and challenge your perspective." },
          { heading: "Your signature taste", body: "Your taste balances comfort with curiosity. You appreciate intricate craftsmanship, vivid storytelling, and nuanced details that most casual observers tend to overlook." },
          { heading: "What makes you unique", body: "You bring an open-minded and intuitive lens to everything you encounter. Your choices reflect a rich personal philosophy that values meaningful connections over superficial hype." }
        ],
        traits: ["Intuitive", "Passionate", "Discerning"],
        recommendations: [
          { title: "Modern Masterpiece", reason: "Matches your deep appreciation for layered storytelling and atmosphere." },
          { title: "The Hidden Gem", reason: "An unconventional choice that aligns with your distinct, curious perspective." },
          { title: "Timeless Classic", reason: "Grounds your eclectic taste with undeniable artistic craftsmanship." },
          { title: "Bold & Unapologetic", reason: "Challenges traditional boundaries, perfect for your adventurous mindset." },
          { title: "The Comfort Choice", reason: "A reliable favorite that always delivers warmth and inspiration." }
        ],
        colors: ["#6366f1", "#a855f7", "#ec4899"],
        oneliner: `Your ${category} taste is an uncompromising journey through depth, passion, and personal discovery.`
      };
    }

    // --- Save to Supabase Server-Side ---
    const shareId = crypto.randomUUID();
    const { error: dbError } = await supabase.from("profiles").insert([
      { share_id: shareId, profile_data: profileData }
    ]);

    if (dbError) {
      console.error("[profile API] ❌ Supabase insert error:", dbError);
    } else {
      console.log(`[profile API] ✅ Saved profile to Supabase with shareId: ${shareId}`);
    }
    
    return NextResponse.json({
      ...profileData,
      shareId,
      dbError: dbError ? dbError.message : null
    });

  } catch (error) {
    console.error("Error in /api/profile:", error);
    return NextResponse.json({ error: "Failed to generate profile" }, { status: 500 });
  }
}

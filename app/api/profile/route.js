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
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const buildPrompt = () => {
      // PART 1 — Instructions: concise, punchy, well-organized with bullet points
      const instructions = `You are an expert taste profiler. A user completed a taste quiz in the ${category} category.

Their answers: ${JSON.stringify(answers)}

Generate a taste profile JSON. Critical rules for section bodies:
- DO NOT write huge walls of text or dense paragraphs.
- Keep each section body crisp, scannable, and well-organized (around 40-70 words per section).
- Structure each section body as:
  1. An intriguing 1-sentence opening hook (in second person: you, your).
  2. Followed by 2 punchy bullet points (using "•") detailing specific nuances directly tied to their quiz choices.
- Be psychological, vivid, and surprisingly accurate.
- Tone: sophisticated, personalized horoscope.

Colors must reflect emotional tone:
- Dark, intense, psychological -> deep purples, crimsons, near blacks
- Adventurous, bold, energetic -> electric orange, teal, acid green
- Warm, social, feel-good -> amber, gold, coral
- Intellectual, curious, complex -> midnight blue, silver, deep teal`;

      // PART 2 — Clean JSON schema
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
            await new Promise(res => setTimeout(res, 1200 * attempt));
          }
        }
      }
      throw lastError;
    };

    // --- Single fast LLM call with retry ---
    let profileData;
    try {
      const result = await callGeminiWithRetry(buildPrompt());
      let responseText = result.response.text();
      responseText = responseText.replace(/```json/gi, "").replace(/```/g, "").trim();
      profileData = JSON.parse(responseText);
      console.log(`[profile API] ✅ Successfully generated profile with archetype: "${profileData.archetype}"`);
    } catch (genError) {
      console.error("[profile API] All Gemini API attempts failed. Using high-quality fallback profile:", genError.message);
      profileData = {
        archetype: "The Eclectic Connoisseur",
        tagline: `A distinct and passionate explorer of all things ${category}.`,
        sections: [
          { 
            heading: "What drives you", 
            body: "You crave authenticity and emotional depth over passive mainstream comfort.\n• Core Driver: Drawn to tension, complex themes, and stories that refuse easy resolutions.\n• The Payoff: Meaningful immersion that leaves a lingering impression long after it ends." 
          },
          { 
            heading: "Your signature taste", 
            body: "Your taste balances comfort with an appetite for intricate craft.\n• Texture: You appreciate nuanced pacing and rich atmosphere that casual observers overlook.\n• Defining Aesthetic: Layered, atmospheric, and bold." 
          },
          { 
            heading: "What makes you unique", 
            body: "You bring an intuitive, highly discerning lens to everything you experience.\n• Perspective: You filter choices through personal resonance rather than algorithmic trends.\n• Trait: Unapologetic about your eclectic, specific tastes." 
          }
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

    profileData.category = category;

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

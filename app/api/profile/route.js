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
      model: "gemini-3.5-flash",
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

    // --- First call ---
    const result = await model.generateContent(buildPrompt());
    let responseText = result.response.text();
    // Safely strip markdown block formatting if the model ignored instructions
    responseText = responseText.replace(/```json/gi, "").replace(/```/g, "").trim();
    let profileData = JSON.parse(responseText);

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
      const retryResult = await model.generateContent(buildPrompt(thinSections));
      let retryText = retryResult.response.text();
      retryText = retryText.replace(/```json/gi, "").replace(/```/g, "").trim();
      const retryData = JSON.parse(retryText);

      // Merge: replace only the thin sections with the expanded versions
      profileData.sections = profileData.sections.map(section => {
        if (thinSections.includes(section.heading)) {
          const expanded = retryData.sections?.find(s => s.heading === section.heading);
          return expanded || section;
        }
        return section;
      });
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

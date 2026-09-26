const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');

let apiKey = process.env.GEMINI_API_KEY;
if (!apiKey && fs.existsSync('.env.local')) {
  const env = fs.readFileSync('.env.local', 'utf8');
  const m = env.match(/GEMINI_API_KEY=(.*)/);
  if (m) apiKey = m[1].trim();
}

const genAI = new GoogleGenerativeAI(apiKey);

const prompt = `You are an expert taste profiler. A user completed a taste quiz in the movies category.
Their answers: [{"question":"What is your go to genre?","selectedOption":"Sci-Fi / Fantasy"}]
Generate a taste profile JSON.
Return raw JSON only, no markdown:
{
  "archetype": "The Visionary Voyager",
  "tagline": "Explores futuristic horizons",
  "sections": [
    { "heading": "What drives you", "body": "You seek transformative ideas." }
  ],
  "traits": ["Visionary", "Analytical", "Curious"],
  "recommendations": [{ "title": "Dune", "reason": "Grand scale worldbuilding" }],
  "colors": ["#d97706", "#ea580c", "#fbbf24"],
  "oneliner": "Exploring the unknown."
}`;

async function test(name) {
  const start = Date.now();
  try {
    const m = genAI.getGenerativeModel({ model: name, generationConfig: { responseMimeType: 'application/json' } });
    const r = await m.generateContent(prompt);
    const text = r.response.text();
    const data = JSON.parse(text);
    console.log(`✅ ${name} SUCCESS (${Date.now() - start}ms): Archetype -> "${data.archetype}"`);
  } catch (e) {
    console.log(`❌ ${name} FAILED (${Date.now() - start}ms):`, e.message);
  }
}

async function main() {
  await test('gemini-3.5-flash');
  await test('gemini-3.8-flash');
}

main();

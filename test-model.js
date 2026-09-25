const { GoogleGenerativeAI } = require('@google/generative-ai');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function test() {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  
  const modelsToTry = [
    'gemini-3.8-flash',
    'gemini-3.8-pro',
    'gemini-3.5-pro',
  ];
  
  const model = genAI.getGenerativeModel({
    model: 'gemini-3.8-flash',
    generationConfig: { responseMimeType: 'application/json' }
  });

  const prompt = `Return JSON only: { "archetype": "Test", "tagline": "Test", "sections": [], "traits": [], "recommendations": [], "colors": [], "oneliner": "Test" }`;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`Attempt ${attempt}...`);
      const result = await model.generateContent(prompt);
      console.log(`✅ Success:`, result.response.text().substring(0, 100));
      break;
    } catch (e) {
      console.log(`❌ Error: ${e.message}`);
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}

test();

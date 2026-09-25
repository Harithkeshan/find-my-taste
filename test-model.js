const { GoogleGenerativeAI } = require('@google/generative-ai');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function test() {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  
  const modelsToTry = [
    'gemini-2.0-flash',
    'gemini-1.5-flash',
  ];
  
  for (const modelName of modelsToTry) {
    try {
      process.stdout.write(`Trying ${modelName}... `);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Say OK');
      console.log(`✅ ${result.response.text().trim().substring(0, 50)}`);
    } catch (e) {
      // Print full error for diagnosis
      console.log(`❌ FULL ERROR: ${e.message}`);
    }
  }
}

test();

const { GoogleGenerativeAI } = require('@google/generative-ai');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function test() {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  
  const modelsToTry = [
    'gemini-3.8-flash',
    'gemini-3.8-pro',
    'gemini-3.5-pro',
  ];
  
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`Attempt ${attempt} for gemini-3.8-flash...`);
      const model = genAI.getGenerativeModel({ model: 'gemini-3.8-flash' });
      const result = await model.generateContent('Say OK');
      console.log(`✅ Success: ${result.response.text().trim()}`);
      break;
    } catch (e) {
      console.log(`❌ Attempt ${attempt} failed: ${e.message}`);
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}

test();

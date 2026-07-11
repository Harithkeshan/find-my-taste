# Find My Taste 🎯

**Find My Taste** is an AI-powered psychological profiling application that analyzes your preferences across different lifestyle categories (Movies, Music, Food, Books, etc.) and generates a stunning, highly personalized "Spotify Wrapped" style shareable taste card.

## ✨ Features

- **Interactive Quizzes:** Dynamic, multi-round quizzes that start surface-level and dig deep into your psyche.
- **AI Taste Profiling:** Uses Google's Gemini AI to analyze your answers and generate a deep, highly personalized psychological taste profile.
- **Stunning UI:** Features a sleek, dark-mode aesthetic with micro-animations, glassmorphism, and neon gradients.
- **Shareable Cards:** Generates a personalized 9:16 portrait card (perfect for Instagram Stories) summarizing your unique archetype, traits, and recommendations.
- **Download & Share:** Instantly download your result card as an image or copy a direct link to share with friends.

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration:** [Google Generative AI (Gemini 3.5 Flash)](https://ai.google.dev/)
- **Image Generation:** `html2canvas` for client-side card rendering

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A Google Gemini API Key

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Harithkeshan/find-my-taste.git
   cd find-my-taste
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure Environment Variables
   Create a `.env.local` file in the root directory and add your API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. Run the Development Server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📸 Screenshots

*(Add screenshots of your stunning quiz interface and generated taste cards here!)*

## 👨‍💻 About

Created by **Ramajeyam Harithkeshan**. 
Find My Taste transforms simple preferences into deep, visually stunning identity profiles.

## 📝 License

This project is licensed under the MIT License.

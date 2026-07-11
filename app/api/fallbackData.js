// DEV_FALLBACK
// Hardcoded high-quality fallback questions and profiles for when the Gemini API hits a 429 Rate Limit error.

export const FALLBACK_QUESTIONS = {
  movies: [
    { question: "What is your go-to genre for a Friday night?", options: ["Thrilling Suspense/Action", "Heartwarming Comedy/Romance", "Mind-bending Sci-Fi/Mystery", "Deep, artistic Indie/Documentary"], allowMultiple: false },
    { question: "How do you feel about movie endings?", options: ["Must wrap up all plot points perfectly", "Open-ended or ambiguous is best", "Tragic and emotional", "Twist ending that changes everything"], allowMultiple: false },
    { question: "Select any elements that instantly make a movie better for you:", options: ["Stunning cinematography", "A killer soundtrack", "Complex villains", "Unpredictable plot twists"], allowMultiple: true },
    { question: "Your favorite type of protagonist is:", options: ["The flawed anti-hero", "The pure-hearted chosen one", "The sarcastic sidekick turned hero", "The brilliant but misunderstood genius"], allowMultiple: false },
    { question: "How do you watch movies?", options: ["In a movie theater with popcorn", "Cozy at home under a blanket", "On my phone/tablet during a commute", "Projector setup with close friends"], allowMultiple: false },
    { question: "Which of these cinematic atmospheres do you prefer?", options: ["Neon-lit cyberpunk cities", "Sweeping historical landscapes", "Gritty, realistic urban settings", "Vibrant, magical fantasy worlds"], allowMultiple: true },
    { question: "How do you handle spoilers?", options: ["I actively seek them out", "I don't mind them", "I get slightly annoyed", "They ruin the entire movie for me"], allowMultiple: false },
    { question: "Your ideal movie soundtrack is:", options: ["Epic orchestral score", "Pop and rock hits", "Synthwave and electronic", "Acoustic and minimalist"], allowMultiple: false },
    { question: "What makes a movie re-watchable for you?", options: ["Catching hidden details", "Reliving the emotional highs", "Showing it to friends", "Just pure comfort and nostalgia"], allowMultiple: false }
  ],
  music: [
    { question: "How do you usually discover new music?", options: ["Algorithmic playlists", "Friends' recommendations", "Social media trends", "Deep-diving into specific genres"], allowMultiple: false },
    { question: "What is your primary reason for listening to music?", options: ["To focus and work", "To boost my energy", "To process emotions", "To set a background vibe"], allowMultiple: false },
    { question: "Select the instruments or sounds that draw you in:", options: ["Heavy bass and synths", "Acoustic guitar and piano", "Complex drum rhythms", "Soaring vocal harmonies"], allowMultiple: true },
    { question: "When listening to a new song, what do you notice first?", options: ["The beat and rhythm", "The lyrics and message", "The overall melody", "The vocal performance"], allowMultiple: false },
    { question: "Your ideal concert experience is:", options: ["A massive stadium tour", "An intimate acoustic set", "A high-energy underground club", "An outdoor summer festival"], allowMultiple: false },
    { question: "Select your favorite musical eras:", options: ["The classics (60s-80s)", "The nostalgic 90s/00s", "Current mainstream hits", "Underground and futuristic"], allowMultiple: true },
    { question: "How organized are your playlists?", options: ["Meticulously categorized by mood", "One giant chaotic playlist", "I mostly listen to full albums", "I just shuffle my liked songs"], allowMultiple: false },
    { question: "What kind of lyrics resonate with you most?", options: ["Deeply poetic and metaphorical", "Relatable and straightforward", "Hype and motivational", "I don't really care about lyrics"], allowMultiple: false },
    { question: "If your life had a theme song, the genre would be:", options: ["Cinematic orchestral", "Upbeat pop", "Moody indie rock", "Lo-fi hip hop"], allowMultiple: false }
  ],
  food: [
    { question: "What is your ultimate comfort food?", options: ["Rich, cheesy pasta", "A hearty bowl of ramen", "Classic burger and fries", "Warm chocolate chip cookies"], allowMultiple: false },
    { question: "Choose your ideal weekend breakfast setting:", options: ["Cozy breakfast in bed", "A bustling, hipster brunch café", "A traditional street food stand", "A quiet bakery with fresh pastries"], allowMultiple: false },
    { question: "Select any flavor profiles you absolutely love:", options: ["Spicy and bold", "Sweet and decadent", "Sour and tangy", "Savory and umami"], allowMultiple: true },
    { question: "What is your stance on cooking?", options: ["It is a chore; I prefer takeout", "It is an art; I love experimenting", "It is a science; I follow recipes exactly", "It is a social event; I cook for others"], allowMultiple: false },
    { question: "Your ideal dining atmosphere is:", options: ["Loud and energetic", "Intimate and dimly lit", "Casual and breezy outdoor", "Fast-paced and efficient"], allowMultiple: false },
    { question: "Select your go-to late-night snacks:", options: ["Salty chips or popcorn", "Sweet candy or ice cream", "Leftover pizza", "Something healthy like fruit"], allowMultiple: true },
    { question: "If you could only eat one texture for a week:", options: ["Crispy", "Creamy", "Chewy", "Tender"], allowMultiple: false },
    { question: "What is your favorite part of a meal?", options: ["The appetizers and starters", "The main course", "The dessert", "The drinks pairing"], allowMultiple: false },
    { question: "A perfect meal must include:", options: ["Perfectly cooked meat", "An abundance of fresh vegetables", "A rich, complex sauce", "A balance of sweet and savory"], allowMultiple: false }
  ],
  books: [
    { question: "What draws you to a book initially?", options: ["A stunning cover", "A compelling summary", "A recommendation from a friend", "The author's reputation"], allowMultiple: false },
    { question: "What is your preferred reading format?", options: ["Physical hardcover/paperback", "E-reader (Kindle, etc.)", "Audiobooks", "I switch between all three"], allowMultiple: false },
    { question: "Select the genres you gravitate towards:", options: ["Epic Fantasy or Sci-Fi", "Mystery and Thrillers", "Literary Fiction", "Non-fiction and Biographies"], allowMultiple: true },
    { question: "What makes you put a book down?", options: ["Slow pacing", "Unlikable characters", "Confusing plot", "Poor writing style"], allowMultiple: false },
    { question: "Where is your favorite place to read?", options: ["Curled up in bed", "In a bustling coffee shop", "Outdoors in nature", "During my daily commute"], allowMultiple: false },
    { question: "Select any book tropes you secretly love:", options: ["Enemies to lovers", "The chosen one", "Found family", "Unreliable narrator"], allowMultiple: true },
    { question: "How do you feel about book series?", options: ["Love them, give me 10 books", "I prefer trilogies", "Standalone books only", "I'll read them if they're finished"], allowMultiple: false },
    { question: "What is the most important element of a story?", options: ["Beautiful, poetic prose", "Complex, flawed characters", "A fast-paced, twisting plot", "Deep thematic meaning"], allowMultiple: false },
    { question: "How do you organize your bookshelf?", options: ["Alphabetically by author", "Color-coded aesthetics", "By genre or mood", "It's a chaotic pile"], allowMultiple: false }
  ],
  games: [
    { question: "What is your primary reason for gaming?", options: ["To relax and unwind", "To compete and win", "To experience a great story", "To socialize with friends"], allowMultiple: false },
    { question: "What type of gameplay loop do you prefer?", options: ["Fast-paced action", "Slow, strategic planning", "Exploration and discovery", "Grinding and upgrading"], allowMultiple: false },
    { question: "Select the game genres you enjoy most:", options: ["RPGs and Story-driven", "FPS and Competitive Shooters", "Cozy Sims (Stardew, Animal Crossing)", "Strategy and Puzzle"], allowMultiple: true },
    { question: "How do you handle difficult boss fights?", options: ["Keep trying until I win", "Look up a guide online", "Take a break and come back later", "Lower the difficulty setting"], allowMultiple: false },
    { question: "What is your preferred gaming platform?", options: ["High-end PC", "Home console (PlayStation, Xbox)", "Handheld (Switch, Steam Deck)", "Mobile phone"], allowMultiple: false },
    { question: "Select any elements that make a game a masterpiece to you:", options: ["Incredible graphics/art style", "A moving soundtrack", "Deep, branching narratives", "Flawless combat mechanics"], allowMultiple: true },
    { question: "How do you feel about open-world games?", options: ["Love exploring every inch", "I focus mainly on the main quest", "They can be too overwhelming", "I prefer linear experiences"], allowMultiple: false },
    { question: "Are you a completionist (getting all achievements/trophies)?", options: ["Always, 100% everything", "Only for games I truly love", "Rarely, I just finish the story", "Never, I move on quickly"], allowMultiple: false },
    { question: "What makes you drop a game?", options: ["Repetitive gameplay", "Too many bugs/glitches", "Boring story", "It's too difficult"], allowMultiple: false }
  ],
  travel: [
    { question: "What is your ideal vacation pace?", options: ["Action-packed, seeing everything", "Completely relaxing, doing nothing", "A balanced mix of both", "Spontaneous, figuring it out as I go"], allowMultiple: false },
    { question: "Where would you most like to travel next?", options: ["A bustling foreign metropolis", "A secluded tropical beach", "A historic, cobblestone village", "A rugged mountain landscape"], allowMultiple: false },
    { question: "Select any travel activities you consider essential:", options: ["Trying local street food", "Visiting museums and landmarks", "Hiking or nature exploration", "Shopping and nightlife"], allowMultiple: true },
    { question: "How do you plan your trips?", options: ["Detailed spreadsheet itineraries", "A loose list of ideas", "I let someone else plan", "No plan, just vibes"], allowMultiple: false },
    { question: "What is your preferred accommodation?", options: ["Luxury hotel/resort", "Cozy Airbnb or cabin", "Budget-friendly hostel", "Camping in nature"], allowMultiple: false },
    { question: "Select the travel companions you prefer:", options: ["Traveling solo", "With my significant other", "A small group of close friends", "A large, fun group"], allowMultiple: true },
    { question: "How do you feel about tourist traps?", options: ["I avoid them at all costs", "They're popular for a reason", "I'll see them once for the photo", "I love the cheesy souvenirs"], allowMultiple: false },
    { question: "What is the best part of coming home?", options: ["Sleeping in my own bed", "Seeing my pets/family", "No more living out of a suitcase", "I never want to come home"], allowMultiple: false },
    { question: "Your ultimate travel goal is to:", options: ["Visit every continent", "Live like a local for a month", "See all the natural wonders", "Eat at the world's best restaurants"], allowMultiple: false }
  ],
  fashion: [
    { question: "How would you describe your everyday style?", options: ["Casual and comfortable", "Trendy and bold", "Classic and minimalist", "Eclectic and vintage"], allowMultiple: false },
    { question: "What is your favorite color palette to wear?", options: ["All black everything", "Earthy neutrals", "Bright, vibrant colors", "Soft pastels"], allowMultiple: false },
    { question: "Select the accessories you never leave home without:", options: ["Statement jewelry", "A stylish hat", "Cool sunglasses", "A functional but chic bag"], allowMultiple: true },
    { question: "How do you shop for clothes?", options: ["Thrifting and vintage stores", "Online fast fashion", "Investing in high-quality staples", "Boutique designer shops"], allowMultiple: false },
    { question: "What dictates your outfit choice in the morning?", options: ["Comfort above all else", "The weather", "My mood that day", "Whatever is clean"], allowMultiple: false },
    { question: "Select any fashion trends you secretly (or openly) love:", options: ["Y2K nostalgia", "Oversized streetwear", "Goth/Alternative", "Preppy/Old Money aesthetic"], allowMultiple: true },
    { question: "How important are brand names to you?", options: ["Very important", "Nice, but not essential", "I prefer unbranded pieces", "I actively avoid logos"], allowMultiple: false },
    { question: "What is the most important element of an outfit?", options: ["The fit and silhouette", "The color coordination", "The shoes", "The confidence of the wearer"], allowMultiple: false },
    { question: "If you had to wear one outfit forever, it would be:", options: ["Sweatpants and a hoodie", "A tailored suit/dress", "Jeans and a vintage tee", "A flowy bohemian dress/shirt"], allowMultiple: false }
  ],
  sports: [
    { question: "What is your primary relationship with sports?", options: ["I love playing them", "I love watching them", "I do both equally", "I only follow major events (Olympics, etc.)"], allowMultiple: false },
    { question: "What type of sport appeals to you most?", options: ["Team sports (Soccer, Basketball)", "Individual sports (Tennis, Golf)", "Extreme sports (Surfing, Snowboarding)", "Combat sports (MMA, Boxing)"], allowMultiple: false },
    { question: "Select what makes a great athlete in your eyes:", options: ["Raw physical talent", "Incredible work ethic", "Strategic intelligence", "Leadership and sportsmanship"], allowMultiple: true },
    { question: "How do you handle watching your favorite team lose?", options: ["I get genuinely upset", "I brush it off quickly", "I blame the referee", "I don't really have a favorite team"], allowMultiple: false },
    { question: "What is the best part of attending a live game?", options: ["The electric crowd energy", "The expensive stadium food", "Seeing the athletes up close", "Tailgating beforehand"], allowMultiple: false },
    { question: "Select any fitness activities you actually enjoy:", options: ["Running or cycling", "Weightlifting", "Yoga or Pilates", "Swimming"], allowMultiple: true },
    { question: "Do you prefer offense or defense?", options: ["Offense: scoring is everything", "Defense: stopping the opponent is an art", "A balanced approach", "Whatever looks the coolest"], allowMultiple: false },
    { question: "What is the most exciting moment in sports?", options: ["A game-winning buzzer-beater", "A massive underdog victory", "A perfectly executed strategic play", "A record-breaking performance"], allowMultiple: false },
    { question: "If you were a professional athlete, what would be your signature trait?", options: ["Unmatched speed", "Incredible strength", "Perfect precision", "Unbreakable endurance"], allowMultiple: false }
  ]
};

// Generic fallback if category is completely unknown
export const FALLBACK_GENERIC = [
  { question: "What brings you the most joy?", options: ["Creating something new", "Connecting with others", "Learning something complex", "Experiencing nature"], allowMultiple: false },
  { question: "How do you prefer to spend your free time?", options: ["Reading a good book", "Watching a thrilling movie", "Playing a challenging game", "Exploring a new place"], allowMultiple: false },
  { question: "Select the elements that inspire you:", options: ["Beautiful art", "Moving music", "Innovative technology", "Compelling stories"], allowMultiple: true },
  { question: "Are you a morning person or a night owl?", options: ["Morning person", "Night owl", "Neither, I need a nap", "Both, I run on coffee"], allowMultiple: false },
  { question: "What is your preferred social setting?", options: ["A large, energetic party", "A small gathering of close friends", "One-on-one deep conversations", "Being completely alone"], allowMultiple: false },
  { question: "Select any traits that describe you well:", options: ["Analytical", "Creative", "Empathetic", "Adventurous"], allowMultiple: true },
  { question: "How do you handle stressful situations?", options: ["I tackle them head-on", "I analyze the problem first", "I seek advice from others", "I try to distract myself"], allowMultiple: false },
  { question: "What is your favorite season?", options: ["Spring", "Summer", "Autumn", "Winter"], allowMultiple: false },
  { question: "If you could instantly master one skill, what would it be?", options: ["Speaking every language", "Playing any instrument", "Cooking like a master chef", "Coding complex software"], allowMultiple: false }
];

export const FALLBACK_PROFILES = {
  movies: {
    archetype: "The Cinematic Visionary",
    description: "You see movies as more than just entertainment; they are a profound art form. You appreciate deep narratives, striking cinematography, and emotional resonance. You're drawn to films that challenge your perspective and leave a lasting impact.",
    keyTraits: ["Analytical", "Imaginative", "Observant", "Empathetic"],
    aesthetics: { theme: "midnight-cinema", gradientStart: "#312e81", gradientEnd: "#881337", textColor: "#ffffff" }
  },
  music: {
    archetype: "The Sonic Explorer",
    description: "Your taste in music is eclectic and deeply personal. You don't just listen to songs; you absorb their rhythm and poetry. You use music to amplify your emotions and navigate your daily life.",
    keyTraits: ["Expressive", "Open-minded", "Rhythmic", "Soulful"],
    aesthetics: { theme: "neon-groove", gradientStart: "#8b5cf6", gradientEnd: "#ec4899", textColor: "#ffffff" }
  },
  food: {
    archetype: "The Flavor Alchemist",
    description: "For you, food is an experience to be savored. You appreciate a balance of bold, dynamic flavors and comforting textures. Whether it's a home-cooked meal or a new restaurant discovery, you seek culinary adventure.",
    keyTraits: ["Adventurous", "Sensory", "Comfort-seeking", "Curious"],
    aesthetics: { theme: "spiced-sunset", gradientStart: "#ea580c", gradientEnd: "#b91c1c", textColor: "#ffffff" }
  },
  books: {
    archetype: "The Literary Voyager",
    description: "You use books as portals to other worlds and diverse perspectives. You value complex characters and immersive world-building. A well-crafted sentence can bring you as much joy as a thrilling plot twist.",
    keyTraits: ["Thoughtful", "Inquisitive", "Imaginative", "Reflective"],
    aesthetics: { theme: "parchment-gold", gradientStart: "#b45309", gradientEnd: "#064e3b", textColor: "#fef3c7" }
  },
  games: {
    archetype: "The Strategic Architect",
    description: "You approach games with a sharp mind and a desire for mastery. You appreciate deep mechanics, engaging narratives, and the thrill of overcoming a difficult challenge. Gaming is both your relaxation and your mental workout.",
    keyTraits: ["Determined", "Strategic", "Focused", "Creative"],
    aesthetics: { theme: "cyber-matrix", gradientStart: "#047857", gradientEnd: "#0f172a", textColor: "#ffffff" }
  },
  travel: {
    archetype: "The Wanderlust Collector",
    description: "You see the world as a vast tapestry of experiences waiting to be discovered. You balance the desire for exciting adventures with a deep appreciation for local cultures and quiet moments of awe.",
    keyTraits: ["Curious", "Adaptable", "Spontaneous", "Energetic"],
    aesthetics: { theme: "ocean-breeze", gradientStart: "#0284c7", gradientEnd: "#14b8a6", textColor: "#ffffff" }
  },
  fashion: {
    archetype: "The Aesthetic Pioneer",
    description: "Your style is a direct extension of your personality. You are not afraid to mix classic staples with bold, eclectic choices. You understand that fashion is about self-expression and feeling confident in your own skin.",
    keyTraits: ["Bold", "Expressive", "Trend-conscious", "Confident"],
    aesthetics: { theme: "velvet-noir", gradientStart: "#1e1b4b", gradientEnd: "#4c1d95", textColor: "#ffffff" }
  },
  sports: {
    archetype: "The Resilient Competitor",
    description: "You respect the dedication, strategy, and raw emotion inherent in sports. Whether you are actively participating or passionately watching, you are drawn to the narratives of triumph, teamwork, and pushing human limits.",
    keyTraits: ["Driven", "Passionate", "Strategic", "Loyal"],
    aesthetics: { theme: "stadium-lights", gradientStart: "#b91c1c", gradientEnd: "#1d4ed8", textColor: "#ffffff" }
  },
  generic: {
    archetype: "The Dynamic Generalist",
    description: "You have a wide-ranging, adaptable taste that refuses to be boxed in. You find joy in various aspects of life and are always eager to learn, explore, and experience something new.",
    keyTraits: ["Versatile", "Curious", "Open-minded", "Engaged"],
    aesthetics: { theme: "aurora-borealis", gradientStart: "#059669", gradientEnd: "#4338ca", textColor: "#ffffff" }
  }
};

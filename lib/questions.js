export const questions = {
  movies: [
    // 1-3 Surface
    { question: "What's your go-to movie genre when you just want to unwind?", options: ["Sci-Fi / Fantasy", "Comedy / Romance", "Thriller / Horror", "Action / Adventure"], allowMultiple: false },
    { question: "Which of these cinematic eras speaks to you the most?", options: ["The Golden Age (1930s-1950s)", "The Gritty 70s", "The Blockbuster 80s/90s", "Modern / Contemporary"], allowMultiple: false },
    { question: "Pick the visual style that immediately draws you in.", options: ["Neon-soaked cyberpunk", "Muted, moody, and atmospheric", "Bright, saturated, and colorful", "Stark, high-contrast black & white"], allowMultiple: true },
    // 4-6 Deep
    { question: "What kind of protagonist do you usually root for?", options: ["The deeply flawed antihero", "The pure-hearted underdog", "The brilliant but misunderstood genius", "The chaotic wild card"], allowMultiple: false },
    { question: "Which aspect of a film is most likely to make it a favorite for you?", options: ["A mind-bending plot twist", "Stunning cinematography", "A flawless, unforgettable soundtrack", "Deep, philosophical dialogue"], allowMultiple: true },
    { question: "How do you feel about ambiguous endings?", options: ["I love them, they leave room for thought", "I hate them, I need closure", "Depends entirely on the execution", "I prefer them over forced happy endings"], allowMultiple: false },
    // 7-9 Nuance
    { question: "What's your absolute dealbreaker in a movie?", options: ["Overreliance on CGI", "Forced romantic subplots", "Characters making inexplicably dumb choices", "Pacing that drags endlessly"], allowMultiple: false },
    { question: "When rewatching a film, what do you look for the most?", options: ["Hidden details I missed the first time", "The comfort of knowing exactly what happens", "Analyzing the acting performances", "Reliving the emotional highs"], allowMultiple: false },
    { question: "What defines a 'perfect' cinematic experience for you?", options: ["A completely silent, pitch-black theater", "A rowdy midnight crowd sharing the energy", "At home with elite snacks and no pants", "A deep discussion immediately after the credits"], allowMultiple: false }
  ],
  music: [
    // 1-3 Surface
    { question: "What's the primary vibe of your daily playlist?", options: ["Upbeat and energetic", "Mellow and acoustic", "Dark and brooding", "Experimental and unpredictable"], allowMultiple: false },
    { question: "When exploring new music, what catches your ear first?", options: ["A catchy vocal melody", "A heavy, driving bassline", "Intricate lyricism", "A unique, textured synth pad"], allowMultiple: false },
    { question: "Which of these environments sounds perfect for listening to your favorite album?", options: ["Driving at night with the windows down", "A packed, sweaty underground club", "Laying on the floor staring at the ceiling", "A sunny afternoon in a busy park"], allowMultiple: true },
    // 4-6 Deep
    { question: "What role do lyrics play for you?", options: ["They are everything; bad lyrics ruin the song", "They're just another instrument", "I like when they are cryptic and poetic", "I prefer catchy hooks over deep meaning"], allowMultiple: false },
    { question: "How do you organize your music library?", options: ["By hyper-specific moods or scenarios", "Strictly by genre or artist", "One massive, chaotic master playlist", "I just let the algorithm decide"], allowMultiple: false },
    { question: "Which sonic textures resonate with you most?", options: ["Warm, vintage analog crackle", "Crisp, pristine digital production", "Fuzzy, distorted, and raw", "Spacious, echoing, and ethereal"], allowMultiple: true },
    // 7-9 Nuance
    { question: "What's a musical dealbreaker that makes you instantly skip a song?", options: ["Overproduced, generic pop drops", "Vocals that are too breathy or whiny", "A beat that takes too long to drop", "Painfully cliché rhyming lyrics"], allowMultiple: false },
    { question: "What makes a live performance unforgettable for you?", options: ["Flawless technical execution", "Raw, unhinged emotional energy", "Incredible stage design and visuals", "Deep connection and banter with the crowd"], allowMultiple: false },
    { question: "Which obscure feeling are you always chasing in a song?", options: ["The nostalgia for a time I never lived in", "The urge to fight a mythological beast", "The peace of being completely alone in a city", "The frantic energy of a looming deadline"], allowMultiple: false }
  ],
  food: [
    // 1-3 Surface
    { question: "What is your ultimate comfort food profile?", options: ["Warm, rich, and carb-heavy", "Spicy, numbing, and intense", "Sweet, buttery, and decadent", "Fresh, crisp, and vibrant"], allowMultiple: false },
    { question: "When eating out, what type of cuisine do you default to?", options: ["Asian (Sushi, Ramen, Thai)", "European (Italian, French, Tapas)", "Latin American (Tacos, Arepas, Ceviche)", "American / Pub Fare (Burgers, Wings)"], allowMultiple: false },
    { question: "Which flavor combination is impossible for you to resist?", options: ["Sweet and Salty", "Spicy and Sour", "Smoky and Savory", "Bitter and Sweet"], allowMultiple: true },
    // 4-6 Deep
    { question: "How adventurous are you with bizarre ingredients?", options: ["I will literally eat anything once", "I'll try it if a local recommends it", "I need to know exactly what it is first", "I stick strictly to what I know"], allowMultiple: false },
    { question: "What makes a restaurant truly great in your eyes?", options: ["Hole-in-the-wall with incredible authenticity", "Michelin-star precision and plating", "A vibrant, loud, and fun atmosphere", "Impeccable, intuitive service"], allowMultiple: true },
    { question: "How do you feel about cooking at home?", options: ["It's a meditative, creative process", "I meal-prep for efficiency", "I only do it to survive", "I'm essentially a mad scientist in the kitchen"], allowMultiple: false },
    // 7-9 Nuance
    { question: "What is an absolute culinary dealbreaker for you?", options: ["Mushy, overcooked textures", "Overpowering artificial sweetness", "Food that is unnecessarily drowning in sauce", "Truffle oil on everything"], allowMultiple: false },
    { question: "When eating a complex dish, how do you approach it?", options: ["I mix everything together immediately", "I eat components one by one", "I construct the perfect bite on every forkful", "I save the best part for the very end"], allowMultiple: false },
    { question: "What elevates a simple meal into perfection?", options: ["The perfect finishing salt or drizzle of oil", "Eating it when genuinely, desperately hungry", "Sharing it with exactly the right people", "The beverage pairing alongside it"], allowMultiple: false }
  ],
  books: [
    // 1-3 Surface
    { question: "Which section of a bookstore do you instinctively walk to first?", options: ["Sci-Fi / Fantasy", "Mystery / Thriller", "Literary Fiction", "Non-Fiction / History"], allowMultiple: false },
    { question: "What format do you prefer to consume books?", options: ["The smell and feel of a physical paperback", "The convenience of an E-reader", "Immersive audiobooks while commuting", "Beautiful, heavy hardcover editions"], allowMultiple: true },
    { question: "What draws you into a book immediately?", options: ["A gripping, fast-paced opening hook", "Gorgeous, poetic prose", "A deeply relatable protagonist", "A completely alien, fascinating setting"], allowMultiple: false },
    // 4-6 Deep
    { question: "What type of pacing do you prefer?", options: ["A slow burn that builds unbearable tension", "Non-stop action and plot twists", "A meandering, character-driven journey", "Short, punchy chapters that fly by"], allowMultiple: false },
    { question: "Which trope are you an absolute sucker for?", options: ["Enemies to lovers", "The unreliable narrator", "The chosen one", "Found family"], allowMultiple: true },
    { question: "How do you feel about world-building?", options: ["I need encyclopedic details and maps", "Show, don't tell; let me piece it together", "I prefer settings grounded in reality", "I just want the aesthetics, skip the politics"], allowMultiple: false },
    // 7-9 Nuance
    { question: "What writing habit instantly ruins a book for you?", options: ["Info-dumping in dialogue", "Overly flowery, purple prose", "Characters that have zero flaws", "Predictable, telegraphed plot twists"], allowMultiple: false },
    { question: "When you finish a masterpiece, what is your immediate reaction?", options: ["Staring at the wall in existential dread", "Immediately researching the author and lore", "Forcing everyone I know to read it", "Starting it over from page one"], allowMultiple: false },
    { question: "What makes a character truly unforgettable to you?", options: ["Their moral ambiguity and difficult choices", "A deeply specific, weird personal quirk", "Their unyielding loyalty to a cause", "A tragic, beautifully written downfall"], allowMultiple: false }
  ],
  games: [
    // 1-3 Surface
    { question: "What is your primary motivation for gaming?", options: ["Escapism and deep immersion", "The thrill of competition", "Relaxing and unwinding", "Experiencing a great interactive story"], allowMultiple: false },
    { question: "Which perspective do you generally prefer?", options: ["First-person (FPS, immersive sims)", "Third-person over the shoulder", "Isometric / Top-down", "Side-scrolling 2D"], allowMultiple: false },
    { question: "Which game mechanics hook you the fastest?", options: ["Deep skill trees and theory-crafting", "Satisfying combat and parry systems", "Base building and resource management", "Exploration and uncovering secrets"], allowMultiple: true },
    // 4-6 Deep
    { question: "How do you approach a massive open-world game?", options: ["I have to clear every single map marker", "I stick strictly to the main questline", "I wander aimlessly and see what happens", "I break the physics engine just for fun"], allowMultiple: false },
    { question: "What type of difficulty curve do you enjoy?", options: ["Punishing but fair (Souls-like)", "A steady, gentle ramp-up", "Dynamic difficulty that adapts to me", "I play on 'Story Mode' and don't care"], allowMultiple: false },
    { question: "What element of game design do you appreciate the most?", options: ["Seamless, diegetic UI", "Incredible sound design and haptics", "Environmental storytelling without words", "Fluid, responsive movement tech"], allowMultiple: true },
    // 7-9 Nuance
    { question: "What is a gaming dealbreaker that makes you uninstall?", options: ["Predatory microtransactions", "Unskippable, overly long cutscenes", "Clunky, unresponsive controls", "Forced stealth sections in non-stealth games"], allowMultiple: false },
    { question: "How do you handle moral choices in RPGs?", options: ["I am a perfect saint who saves everyone", "I pick the most chaotic, evil options possible", "I agonize over the pragmatic, realistic choice", "I save scum until I get the outcome I want"], allowMultiple: false },
    { question: "What defines a perfect 'game feel' for you?", options: ["The heavy, meaty impact of a perfect strike", "The flow-state of chaining mobility moves", "The satisfying click of a puzzle sliding into place", "The tension of surviving with 1 HP left"], allowMultiple: false }
  ],
  travel: [
    // 1-3 Surface
    { question: "What is your ideal travel environment?", options: ["A bustling, neon-lit metropolis", "A quiet, secluded beach", "A dense, ancient forest or mountain range", "Historical ruins and old cobblestone streets"], allowMultiple: false },
    { question: "How do you approach trip planning?", options: ["An aggressively color-coded spreadsheet", "I book a flight and wing the rest", "A loose list of 2-3 anchor activities per day", "I hire someone else or join a guided tour"], allowMultiple: false },
    { question: "What activities dominate your itinerary?", options: ["Eating at highly-rated local spots", "Visiting museums and cultural landmarks", "Extreme sports or hiking", "Shopping and cafe-hopping"], allowMultiple: true },
    // 4-6 Deep
    { question: "How do you prefer to get around a new city?", options: ["Walking absolutely everywhere", "Navigating the complex public transit", "Renting a car or scooter", "Taxis or ride-shares only"], allowMultiple: false },
    { question: "What kind of accommodation do you seek out?", options: ["A luxury hotel with room service", "A quirky, local boutique Airbnb", "A social, chaotic backpacker hostel", "A tent under the stars"], allowMultiple: false },
    { question: "Which travel experiences stick with you the most?", options: ["A spontaneous conversation with a local", "Seeing a world-famous monument in person", "Getting completely, hopelessly lost", "Tasting a flavor I've never experienced before"], allowMultiple: true },
    // 7-9 Nuance
    { question: "What is your ultimate travel dealbreaker?", options: ["Crushingly dense tourist crowds", "Terrible local food options", "No reliable Wi-Fi or cell service", "Extreme, uncomfortable weather"], allowMultiple: false },
    { question: "How do you document your trips?", options: ["I take hundreds of photos a day", "I keep a detailed, handwritten journal", "Just a few mental snapshots, no camera", "I curate the perfect aesthetic social feed"], allowMultiple: false },
    { question: "What is the true sign of a successful trip?", options: ["Returning completely exhausted but fulfilled", "Feeling genuinely sad to leave", "Learning something profound about yourself", "Having an insane story to tell at parties"], allowMultiple: false }
  ],
  fashion: [
    // 1-3 Surface
    { question: "What is the foundational philosophy of your wardrobe?", options: ["Comfort above all else", "Striking, avant-garde silhouettes", "Timeless, classic minimalism", "Loud, expressive, and colorful"], allowMultiple: false },
    { question: "Which color palette dominates your closet?", options: ["Strictly all black, always", "Earthy neutrals (olives, browns, creams)", "Pastels and soft hues", "High-contrast primary colors"], allowMultiple: false },
    { question: "What is your favorite accessory to elevate an outfit?", options: ["Chunky, statement jewelry", "A perfectly structured bag", "Unique, eye-catching footwear", "A signature fragrance"], allowMultiple: true },
    // 4-6 Deep
    { question: "How do you approach shopping for clothes?", options: ["Scouring thrift stores for vintage gems", "Investing heavily in high-end designer pieces", "Fast-fashion hauls to stay on trend", "Buying high-quality basics that last forever"], allowMultiple: false },
    { question: "What dictates your daily outfit choice?", options: ["Strictly the weather and practicality", "My current emotional mood", "Whatever is clean on the floor", "A carefully planned aesthetic vision"], allowMultiple: false },
    { question: "Which fabric textures do you gravitate towards?", options: ["Heavy, structured denim and canvas", "Soft, flowing silks and satins", "Cozy, oversized knits and wool", "Sleek, futuristic synthetics and leather"], allowMultiple: true },
    // 7-9 Nuance
    { question: "What is a fashion trend you refuse to participate in?", options: ["Logomania (branding plastered everywhere)", "Ultra low-rise jeans", "Chunky, ugly 'dad' shoes", "Micro-bags that hold absolutely nothing"], allowMultiple: false },
    { question: "What makes an article of clothing 'perfect' for you?", options: ["The way it flawlessly tailors to my body", "Its versatility across multiple outfits", "The obscure, interesting history behind it", "The sheer audacity of how weird it is"], allowMultiple: false },
    { question: "When you put together an amazing fit, who are you dressing for?", options: ["Myself, purely for the mirror selfie", "The subtle nod of respect from other fashion nerds", "To intimidate my enemies", "To attract a specific type of person"], allowMultiple: false }
  ],
  sports: [
    // 1-3 Surface
    { question: "What is your primary relationship with sports?", options: ["I play them competitively", "I'm a die-hard spectator and fan", "I casually play for fitness and fun", "I just watch for the drama and storylines"], allowMultiple: false },
    { question: "Which type of sport appeals to you the most?", options: ["High-contact team sports (Football, Rugby)", "Precision individual sports (Tennis, Golf)", "Endurance sports (Running, Cycling)", "Extreme/Action sports (Skating, Surfing)"], allowMultiple: false },
    { question: "What makes a sporting event exciting to watch?", options: ["A massive underdog pulling an upset", "A display of inhuman athletic dominance", "Tactical, strategic masterclasses", "The chaotic energy of the crowd"], allowMultiple: true },
    // 4-6 Deep
    { question: "How do you react when your favorite team loses?", options: ["Absolute devastation, day ruined", "I over-analyze the stats to figure out why", "I'm used to it, there's always next year", "I immediately blame the referees"], allowMultiple: false },
    { question: "What is your preferred role on a team?", options: ["The flashy star player", "The quiet, reliable workhorse", "The vocal, inspiring captain", "The strategic mastermind / coach"], allowMultiple: false },
    { question: "What aspects of sports culture do you love the most?", options: ["The intense, generational rivalries", "The aesthetic of the jerseys and gear", "The deep statistical history and lore", "Tailgating and the communal experience"], allowMultiple: true },
    // 7-9 Nuance
    { question: "What is an absolute dealbreaker in a sports environment?", options: ["Obnoxious, toxic fans", "A boring, overly-defensive playstyle", "Too many commercial breaks", "Athletes who lack passion or hustle"], allowMultiple: false },
    { question: "What defines true athletic greatness in your eyes?", options: ["Winning championships, period", "Revolutionizing how the game is played", "Incredible longevity and consistency", "Raw, unmatched natural talent"], allowMultiple: false },
    { question: "What is the perfect sports viewing scenario?", options: ["Front row seats at the stadium", "At a packed, loud sports bar", "On my couch with multiple screens and stats open", "Watching highlight reels the next morning"], allowMultiple: false }
  ]
};

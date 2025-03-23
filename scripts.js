document.addEventListener('DOMContentLoaded', function() {
    // 幻灯片控制函数
    function initSlideshow() {
        console.log("初始化幻灯片...");
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        
        if (slides.length === 0 || dots.length === 0) {
            console.error("未找到幻灯片或导航点元素");
            return;
        }
        
        console.log(`找到 ${slides.length} 张幻灯片和 ${dots.length} 个导航点`);
        
        let currentSlide = 0;
        let slideInterval;
        
        // 确保所有幻灯片初始状态正确
        slides.forEach((slide, index) => {
            if (index === 0) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        dots.forEach((dot, index) => {
            if (index === 0) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // 启动轮播定时器
        startSlideInterval();
        
        // 启动轮播定时器函数
        function startSlideInterval() {
            clearInterval(slideInterval); // 清除现有定时器
            slideInterval = setInterval(nextSlide, 2000); // 每2秒切换一次图片
            console.log("开始自动轮播");
        }
        
        // 点击导航点切换幻灯片
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(index);
                startSlideInterval();
            });
        });
        
        // 显示指定幻灯片
        function showSlide(index) {
            console.log(`显示幻灯片 ${index}`);
            // 先把所有幻灯片和导航点设为非活动
            slides.forEach((slide) => {
                slide.classList.remove('active');
            });
            
            dots.forEach((dot) => {
                dot.classList.remove('active');
            });
            
            // 设置当前幻灯片和导航点为活动状态
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            currentSlide = index;
        }
        
        // 显示下一张幻灯片
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        // 当用户离开页面和返回页面时重置定时器
        document.addEventListener('visibilitychange', function() {
            if (document.visibilityState === 'visible') {
                startSlideInterval();
            } else {
                clearInterval(slideInterval);
            }
        });
    }
    
    // 确保DOM加载完成后立即初始化幻灯片
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSlideshowOnLoad);
    } else {
        initSlideshowOnLoad();
    }
    
    function initSlideshowOnLoad() {
        setTimeout(() => {
            if (document.querySelector('.slideshow-container')) {
                console.log("找到幻灯片容器，正在初始化...");
                initSlideshow();
            } else {
                console.error("未找到幻灯片容器");
            }
        }, 100); // 短暂延迟确保DOM元素已完全加载
    }

    // 所有问题数据
    const quizQuestions = [
        {
            id: 1,
            title: "Film Aesthetics",
            question: "Which film's visual world would you most like to live in?",
            options: [
                {
                    emoji: "🎩",
                    title: "The Grand Budapest Hotel",
                    explanation: "Symmetrical aesthetics → Vintage pink pepper + iris, elegant and intellectual",
                    value: "grand_budapest",
                    notes: ["pink_pepper", "iris"],
                    complexity: 3
                },
                {
                    emoji: "🌌",
                    title: "Blade Runner 2049",
                    explanation: "Cyberpunk → Metallic patchouli + electronic smoke notes",
                    value: "blade_runner",
                    notes: ["patchouli", "electronic_smoke"],
                    complexity: 5
                },
                {
                    emoji: "🍄",
                    title: "Alice in Wonderland",
                    explanation: "Fantasy adventure → Psychedelic mushroom + berry gourmand notes",
                    value: "alice",
                    notes: ["mushroom", "berry"],
                    complexity: 4
                },
                {
                    emoji: "🎻",
                    title: "The Legend of 1900",
                    explanation: "Classical romance → Sea salt + vintage cedarwood",
                    value: "legend_1900",
                    notes: ["sea_salt", "cedarwood"],
                    complexity: 2
                }
            ]
        },
        {
            id: 2,
            title: "Music Personality",
            question: "What's on your late-night playlist?",
            options: [
                {
                    emoji: "🎷",
                    title: "Jazz (Miles Davis)",
                    explanation: "→ Whiskey + tobacco notes",
                    value: "jazz",
                    notes: ["whiskey", "tobacco"],
                    intensity: 4
                },
                {
                    emoji: "🎸",
                    title: "Classic Rock (Queen)",
                    explanation: "→ Leather + amber",
                    value: "rock",
                    notes: ["leather", "amber"],
                    intensity: 5
                },
                {
                    emoji: "🎹",
                    title: "Electronic Music (Daft Punk)",
                    explanation: "→ Synthetic musk + ozone elements",
                    value: "electronic",
                    notes: ["synthetic_musk", "ozone"],
                    intensity: 2
                },
                {
                    emoji: "🎻",
                    title: "Classical Music (Bach)",
                    explanation: "→ Cashmere wood + old paper scent",
                    value: "classical",
                    notes: ["cashmere_wood", "paper"],
                    intensity: 3
                }
            ]
        },
        {
            id: 3,
            title: "Art Movements",
            question: "Which art movement speaks to you the most?",
            options: [
                {
                    emoji: "🎭",
                    title: "Surrealism",
                    explanation: "→ Fantastic aldehydes",
                    value: "surrealism",
                    notes: ["aldehydes", "strange_fruits"],
                    quirkiness: 5
                },
                {
                    emoji: "🎪",
                    title: "Pop Art",
                    explanation: "→ Sweet fruit notes",
                    value: "pop_art",
                    notes: ["sweet_fruits", "candy"],
                    quirkiness: 3
                },
                {
                    emoji: "🏛️",
                    title: "Renaissance",
                    explanation: "→ Myrrh + frankincense",
                    value: "renaissance",
                    notes: ["myrrh", "frankincense"],
                    quirkiness: 1
                },
                {
                    emoji: "🖌️",
                    title: "Street Art",
                    explanation: "→ Spray paint metallic notes",
                    value: "street_art",
                    notes: ["metallic", "spray_paint"],
                    quirkiness: 4
                }
            ]
        },
        {
            id: 4,
            title: "Global Breakfast",
            question: "Which morning breakfast scene appeals to you most?",
            options: [
                {
                    emoji: "☕",
                    title: "Paris Café",
                    explanation: "Croissant + black coffee → Coffee + butter notes",
                    value: "paris",
                    notes: ["coffee", "butter"],
                    region: "europe"
                },
                {
                    emoji: "🍵",
                    title: "Kyoto Tea Room",
                    explanation: "Matcha + wagashi → Matcha + bamboo freshness",
                    value: "kyoto",
                    notes: ["matcha", "bamboo"],
                    region: "asia"
                },
                {
                    emoji: "🌮",
                    title: "Mexico City Market",
                    explanation: "Chili sauce + corn tortillas → Chili + lime notes",
                    value: "mexico",
                    notes: ["chili", "lime"],
                    region: "america"
                },
                {
                    emoji: "🥑",
                    title: "California Health Breakfast",
                    explanation: "Avocado toast → Fig + green leaves notes",
                    value: "california",
                    notes: ["fig", "green_leaves"],
                    region: "america"
                }
            ]
        },
        {
            id: 5,
            title: "Mystical Powers",
            question: "Which mystical power source would you like to possess?",
            options: [
                {
                    emoji: "🔮",
                    title: "Gypsy Tarot Cards",
                    explanation: "→ Ambergris + mysterious incense",
                    value: "tarot",
                    notes: ["ambergris", "incense"],
                    spirituality: 5
                },
                {
                    emoji: "🌌",
                    title: "Nordic Runes",
                    explanation: "→ Cold fir + glacier water aquatic notes",
                    value: "runes",
                    notes: ["fir", "glacier_water"],
                    spirituality: 3
                },
                {
                    emoji: "🐉",
                    title: "Chinese I Ching",
                    explanation: "→ Agarwood + pu-erh tea",
                    value: "iching",
                    notes: ["agarwood", "tea"],
                    spirituality: 4
                },
                {
                    emoji: "🌵",
                    title: "Shamanic Herbs",
                    explanation: "→ Sage + holy wood smoke",
                    value: "shamanic",
                    notes: ["sage", "wood_smoke"],
                    spirituality: 4
                }
            ]
        },
        {
            id: 6,
            title: "Dream Destination",
            question: "Which travel destination calls to you?",
            options: [
                {
                    emoji: "🌋🗿",
                    title: "Easter Island Adventure",
                    explanation: "→ Volcanic minerals + ancient moss",
                    value: "easter_island",
                    notes: ["volcanic", "moss"],
                    adventure: 5
                },
                {
                    emoji: "🏰🎭",
                    title: "Vienna Opera House",
                    explanation: "→ Velvet + gilded decoration notes",
                    value: "vienna",
                    notes: ["velvet", "gold"],
                    adventure: 2
                },
                {
                    emoji: "🏄‍♂️🌴",
                    title: "Bali Surfing",
                    explanation: "→ Coconut milk + seaweed salt notes",
                    value: "bali",
                    notes: ["coconut", "seaweed"],
                    adventure: 4
                },
                {
                    emoji: "🚀🌕",
                    title: "Moon Base",
                    explanation: "→ Vacuum metallic + oxygen bubble notes",
                    value: "moon",
                    notes: ["metallic", "oxygen"],
                    adventure: 5
                }
            ]
        },
        {
            id: 7,
            title: "Time Travel",
            question: "If you had a time machine, which era would you experience?",
            options: [
                {
                    emoji: "🥂",
                    title: "1920s Jazz Age",
                    explanation: "→ Champagne + feather fringe notes",
                    value: "1920s",
                    notes: ["champagne", "feather"],
                    nostalgia: 4
                },
                {
                    emoji: "☮️",
                    title: "1960s Hippie Movement",
                    explanation: "→ Cannabis + psychedelic patchouli",
                    value: "1960s",
                    notes: ["cannabis", "patchouli"],
                    nostalgia: 3
                },
                {
                    emoji: "🪩",
                    title: "1980s Disco Fever",
                    explanation: "→ Neon tube-like synthetic notes",
                    value: "1980s",
                    notes: ["synthetic", "neon"],
                    nostalgia: 2
                },
                {
                    emoji: "🤖",
                    title: "3020s Future City",
                    explanation: "→ Liquid metal + nano-particle notes",
                    value: "3020s",
                    notes: ["metal", "nano"],
                    nostalgia: 0
                }
            ]
        }
    ];

    // 定义推荐香水数据
    const perfumeData = [
        {
            id: 1,
            name: "Byredo Bibliothèque",
            image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
            notes: {
                top: ["Peach", "Plum"],
                middle: ["Violet", "Peony"],
                base: ["Leather", "Patchouli", "Vanilla"]
            },
            price: "$190",
            description: "A sophisticated fragrance that evokes the atmosphere of an old library with leather-bound books.",
            profiles: ["intellectual", "elegant", "vintage"],
            suitedFor: ["grand_budapest", "classical"]
        },
        {
            id: 2,
            name: "Maison Margiela Replica Jazz Club",
            image: "https://images.unsplash.com/photo-1615144178805-991dfd8156f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
            notes: {
                top: ["Pink Pepper", "Lemon", "Neroli"],
                middle: ["Rum", "Clary Sage"],
                base: ["Tobacco Leaf", "Vanilla Bean", "Styrax"]
            },
            price: "$135",
            description: "A warm and spicy fragrance reminiscent of a Brooklyn jazz club.",
            profiles: ["warm", "sophisticated", "masculine"],
            suitedFor: ["jazz", "1920s", "rock"]
        },
        {
            id: 3,
            name: "Diptyque Philosykos",
            image: "https://images.unsplash.com/photo-1592945403345-980585f18b26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
            notes: {
                top: ["Fig Leaf", "Green Notes"],
                middle: ["Fig", "Coconut"],
                base: ["Cedar", "Woody Notes"]
            },
            price: "$165",
            description: "A fresh and green fragrance inspired by the fig trees of Greece.",
            profiles: ["fresh", "natural", "mediterranean"],
            suitedFor: ["california", "bali", "green_leaves"]
        },
        {
            id: 4,
            name: "Le Labo Santal 33",
            image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
            notes: {
                top: ["Violet Accord", "Cardamom"],
                middle: ["Iris", "Ambrox"],
                base: ["Sandalwood", "Cedar", "Leather"]
            },
            price: "$215",
            description: "An iconic unisex fragrance that blends spicy, leathery, and musky notes.",
            profiles: ["iconic", "unisex", "distinctive"],
            suitedFor: ["leather", "rock", "surrealism"]
        },
        {
            id: 5,
            name: "Tom Ford Tobacco Vanille",
            image: "https://images.unsplash.com/photo-1617184003107-0df15fea4903?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
            notes: {
                top: ["Tobacco Leaf", "Spices"],
                middle: ["Vanilla", "Cacao"],
                base: ["Dried Fruits", "Woody Notes"]
            },
            price: "$240",
            description: "A rich, spicy, and sweet fragrance with opulent notes of tobacco and vanilla.",
            profiles: ["luxurious", "rich", "sweet"],
            suitedFor: ["tobacco", "jazz", "renaissance"]
        },
        {
            id: 6,
            name: "Frederic Malle Portrait of a Lady",
            image: "https://images.unsplash.com/photo-1585178433635-fbf36dc1e376?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
            notes: {
                top: ["Rose", "Blackcurrant"],
                middle: ["Raspberry", "Clove"],
                base: ["Patchouli", "Sandalwood", "Incense"]
            },
            price: "$275",
            description: "An opulent and sophisticated fragrance built around an unprecedented concentration of rose.",
            profiles: ["opulent", "intense", "elegant"],
            suitedFor: ["tarot", "vienna", "renaissance"]
        },
        {
            id: 7,
            name: "Comme des Garçons Concrete",
            image: "https://images.unsplash.com/photo-1589732025089-075a3485b04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
            notes: {
                top: ["Sandalwood"],
                middle: ["Rose Oxide"],
                base: ["Concrete Accord", "Woody Notes"]
            },
            price: "$145",
            description: "A futuristic and industrial fragrance with a unique concrete accord.",
            profiles: ["avant-garde", "architectural", "modern"],
            suitedFor: ["blade_runner", "street_art", "3020s"]
        },
        {
            id: 8,
            name: "Jo Malone English Pear & Freesia",
            image: "https://images.unsplash.com/photo-1608528577891-eb055944b2d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
            notes: {
                top: ["Pear", "Melon"],
                middle: ["Freesia", "Rose"],
                base: ["Musk", "Patchouli", "Amber"]
            },
            price: "$155",
            description: "A delicate and fresh fragrance capturing the luscious scent of just-ripe pears and freesias.",
            profiles: ["light", "fresh", "elegant"],
            suitedFor: ["california", "pop_art", "alice"]
        }
    ];

    // 添加香水科普内容数据结构
    const perfumeEducationData = {
        // 香调DNA科普内容
        dnaContent: {
            "aquatic": {
                title: "🌊 Why Aquatic Notes Remind Us of the Ocean",
                content: `
                    <div class="science-section">
                        <p><span class="highlight">🧪 Scientific Revelation</span>: The molecule Calone, a key component in aquatic fragrances, has a structure similar to sea water evaporation compounds. This triggers hippocampus-based ocean memories.</p>
                        <p><span class="highlight">🏛️ Cultural Origins</span>: Consider Diptyque's "waterside garden" imagery in their fig-based fragrances, blending Mediterranean coastal impressions.</p>
                        <p><span class="highlight">📊 Global Trends</span>: 35% of coastal city dwellers prefer aquatic notes in their fragrances.</p>
                    </div>
                `
            },
            "woody": {
                title: "🌲 The Millennial Dialogue Between Cedarwood & Sandalwood",
                content: `
                    <div class="science-section">
                        <p><span class="highlight">🗺️ Geographic Origins</span>: Compare the density variations between Himalayan Cedarwood (found in Dior Sauvage) and Mysore Sandalwood (featured in Jo Malone fragrances).</p>
                        <p><span class="highlight">🧠 Olfactory Psychology</span>: Woody notes activate the orbitofrontal cortex in the brain, producing neural signals associated with "security" and "grounding".</p>
                    </div>
                `
            },
            "floral": {
                title: "🌹 The Secret Language of Flowers",
                content: `
                    <div class="science-section">
                        <p><span class="highlight">🔍 Molecular Complexity</span>: A single Damascus rose contains over 300 aromatic molecules, creating one of nature's most complex scent profiles.</p>
                        <p><span class="highlight">⏳ Historical Impact</span>: Rose waters were used by ancient Egyptian pharaohs as offerings to the gods, believing their scent could transcend to the afterlife.</p>
                    </div>
                `
            },
            "oriental": {
                title: "✨ The Mystic Journey of Spices and Resins",
                content: `
                    <div class="science-section">
                        <p><span class="highlight">🧭 Trade History</span>: The famed Silk Road transported not just silks but precious aromatics like frankincense and myrrh, which were worth more than gold by weight.</p>
                        <p><span class="highlight">🔥 Alchemical Traditions</span>: Arabian perfumery developed distillation techniques in the 9th century, transforming how humanity captured scent.</p>
                    </div>
                `
            },
            "citrus": {
                title: "🍋 The Brightness of Citrus: Nature's Mood Enhancer",
                content: `
                    <div class="science-section">
                        <p><span class="highlight">⚡️ Neurological Effects</span>: Limonene, the primary molecule in citrus oils, has been shown to directly influence serotonin pathways in the brain.</p>
                        <p><span class="highlight">⏱️ Volatility Secrets</span>: Citrus notes are always top notes because their molecular structure makes them evaporate faster than other scent compounds.</p>
                    </div>
                `
            }
        },
        
        // 香调冷知识
        coldFacts: {
            "rose": {
                title: "🌹 Rose Notes: The Royal Deception",
                content: `
                    <div class="fact-section">
                        <p><span class="highlight">👑 Historical Easter Egg</span>: Louis XIV used rose water to mask the unpleasant odors of Versailles Palace, establishing roses as a symbol of refinement.</p>
                        <p><span class="highlight">🧪 Chemical Paradox</span>: Damascus roses actually contain sulfur compounds - the same molecular family responsible for unpleasant odors!</p>
                    </div>
                `
            },
            "citrus": {
                title: "🍊 The Citrus Industry Secret",
                content: `
                    <div class="fact-section">
                        <p><span class="highlight">🔬 Industry Revelation</span>: 90% of citrus fragrances use synthetic limonene rather than natural extracts.</p>
                        <p><span class="highlight">💰 Economic Impact</span>: It takes approximately 3,000 lemons to produce one kilogram of cold-pressed lemon oil.</p>
                    </div>
                `
            },
            "oud": {
                title: "🪵 Oud: The Liquid Gold of Perfumery",
                content: `
                    <div class="fact-section">
                        <p><span class="highlight">💎 Rarity Factor</span>: Genuine oud comes from agarwood trees infected with a specific fungus - only 2% of these trees naturally produce it.</p>
                        <p><span class="highlight">⚖️ Market Value</span>: High-quality oud can cost more than gold by weight, reaching prices of $100,000 per kilogram.</p>
                    </div>
                `
            },
            "musk": {
                title: "✨ Musk: From Animal Kingdom to Laboratory",
                content: `
                    <div class="fact-section">
                        <p><span class="highlight">🦌 Ethical Evolution</span>: Originally derived from musk deer glands, almost all modern musks are synthetic recreations designed to replicate the animal scent.</p>
                        <p><span class="highlight">👃 Olfactory Illusion</span>: Some synthetic musks can cause "specific anosmia" - about 10% of people cannot smell certain musk molecules at all!</p>
                    </div>
                `
            }
        },
        
        // 工艺解密
        craftSecrets: [
            {
                title: "⚗️ How 1 Ton of Rose Petals Becomes 5ml of Essential Oil",
                content: `
                    <div class="craft-section">
                        <p><span class="highlight">🔥 Traditional Distillation</span> vs <span class="highlight">❄️ Supercritical CO₂ Extraction</span>: The former captures water-soluble compounds while the latter preserves heat-sensitive molecules.</p>
                        <p><span class="highlight">🌹 Molecular Richness</span>: Damascus roses contain 300+ aromatic molecules while China's Pingyin roses have only 127 identifiable compounds.</p>
                        <button class="apple-button">Watch Extraction Process ▶️</button>
                    </div>
                `
            },
            {
                title: "🔮 The Art of Synthetic Molecules",
                content: `
                    <div class="craft-section">
                        <p><span class="highlight">🧪 Nature-Identical Creation</span>: Modern perfumers can synthesize molecules that are chemically identical to those found in nature, but at a fraction of the environmental cost.</p>
                        <p><span class="highlight">🌟 Innovation Timeline</span>: The first synthetic fragrance compound, coumarin (extracted from tonka beans), was created in 1868, revolutionizing the entire perfume industry.</p>
                    </div>
                `
            }
        ],
        
        // 行业揭秘
        industrySecrets: [
            {
                title: "⏳ The Truth About Perfume Shelf Life",
                content: `
                    <div class="secret-section">
                        <p><span class="highlight">🧫 Experimental Evidence</span>: Unopened perfumes stored in ideal conditions have been found usable after 50+ years, contradicting conventional marketing.</p>
                        <p><span class="highlight">📝 Oxidation Facts</span>: The alcohol base in perfumes actually helps preserve ingredients rather than degrading them, when protected from light and heat.</p>
                        <button class="apple-button">View Microscopic Comparison 🔍</button>
                    </div>
                `
            },
            {
                title: "🕵️‍♀️ The Dupe Perfume Trap",
                content: `
                    <div class="secret-section">
                        <p><span class="highlight">🧪 Chemical Substitutions</span>: Imitation fragrances often use ethyl maltol to simulate sandalwood notes, creating an initially similar but shorter-lasting impression.</p>
                        <p><span class="highlight">📊 Concentration Differences</span>: Authentic perfumes typically contain 15-30% aromatic compounds, while many dupes contain just 3-8%.</p>
                    </div>
                `
            }
        ],
        
        // 气味与科学跨界
        scienceCrossover: [
            {
                title: "🔬 Olfactory Memory: The Scientific Validation of the Proust Effect",
                content: `
                    <div class="science-crossover-section">
                        <p><span class="highlight">🧠 Neural Mechanism</span>: The amygdala encodes scent-emotion connections directly, bypassing conscious processing - explaining why smells trigger powerful memories.</p>
                        <p><span class="highlight">📊 Case Study</span>: Cedar notes activate the brain's "security" regions, making it a common base note in fragrances designed to evoke comfort.</p>
                        <button class="apple-button">View AR Brain Activation Model 🧠</button>
                    </div>
                `
            },
            {
                title: "🧬 Your Genetic Scent Fingerprint",
                content: `
                    <div class="science-crossover-section">
                        <p><span class="highlight">🔬 Receptor Variation</span>: Humans have approximately 400 olfactory receptors, but genetic variations mean no two people smell the exact same scent identically.</p>
                        <p><span class="highlight">🔍 Personal Chemistry</span>: Your skin's pH and bacterial composition transform perfumes uniquely on your skin - creating your signature scent interaction.</p>
                    </div>
                `
            }
        ],
        
        // 实用技巧
        practicalTips: {
            mobile: {
                title: "📱 Essential Tips for On-the-Go Fragrance",
                content: `
                    <div class="tips-section">
                        <p><span class="highlight">🔄 Innovative Application</span>: Spray a small amount on the inside of your phone case for subtle fragrance release during calls.</p>
                        <p><span class="highlight">☀️ Preservation Advisory</span>: Avoid direct sunlight exposure - UV rays accelerate perfume breakdown by disrupting molecular bonds.</p>
                        <p><span class="highlight">🧊 Summer Strategy</span>: Store travel atomizers in your refrigerator before a hot day out for longer-lasting projection.</p>
                    </div>
                `
            },
            desktop: {
                title: "🖥️ Workspace Scenting Strategies",
                content: `
                    <div class="tips-section">
                        <p><span class="highlight">💧 Diffusion Hack</span>: Add a few drops of fragrance to your humidifier for subtle, all-day office scenting.</p>
                        <p><span class="highlight">👔 Professional Courtesy</span>: Choose low-sillage fragrances with minimal projection to avoid disrupting colleagues in shared spaces.</p>
                        <p><span class="highlight">📝 Concentration Boost</span>: Citrus and mint notes have been shown to improve focus during extended work sessions.</p>
                    </div>
                `
            }
        },
        
        // 互动内容
        interactiveContent: {
            title: "🎨 Your Personal Scent Laboratory",
            content: `
                <div class="interactive-section">
                    <p><span class="highlight">🔮 Custom Blend Analysis</span>: Upload your fragrance collection and our AI will generate a scent compatibility report for layering possibilities.</p>
                    <p><span class="highlight">🧪 DIY Citrus Solid Perfume</span>: Create your own portable fragrance with simple ingredients.</p>
                    <div class="user-content-section">
                        <p><span class="highlight">👤 Community Insight</span>: User @ScentExplorer: "Layering the peach shower gel with amber perfume creates the perfect pseudo-skin scent!"</p>
                        <button class="apple-button">Copy This Recipe ✂️</button>
                    </div>
                </div>
            `
        },
        
        // 转化入口
        conversionEntries: {
            "aquatic": {
                product: "Hermès Un Jardin Sur Le Nil",
                text: "Experience the pinnacle of aquatic fragrances →"
            },
            "woody": {
                product: "Diptyque Tam Dao",
                text: "Discover the #1 rated spiritual sandalwood →"
            },
            "floral": {
                product: "Frédéric Malle Portrait of a Lady",
                text: "Explore the queen of rose compositions →"
            },
            "oriental": {
                product: "Tom Ford Tobacco Vanille",
                text: "Indulge in the ultimate spiced amber experience →"
            },
            "citrus": {
                product: "Acqua di Parma Colonia",
                text: "Discover Italian citrus perfection →"
            }
        }
    };

    let currentQuestion = 0;
    let userSelections = [];
    const quizContainer = document.getElementById('quiz-container');
    const startButton = document.getElementById('start-quiz');

    // 开始问卷
    startButton.addEventListener('click', function() {
        document.querySelector('.quiz-intro').classList.add('hidden');
        showQuestion(currentQuestion);
    });

    // 显示问题
    function showQuestion(index) {
        if (index >= quizQuestions.length) {
            showResults();
            return;
        }

        const question = quizQuestions[index];
        
        // 创建问题元素
        const questionElement = document.createElement('div');
        questionElement.className = 'quiz-question animate-fade-in';
        questionElement.id = `question-${question.id}`;
        
        // 创建进度条
        const progressBar = `
            <div class="mb-6 w-full bg-apple-gray-200 dark:bg-apple-gray-700 h-2 rounded-full overflow-hidden">
                <div class="bg-gradient-to-r from-apple-purple to-apple-pink h-full rounded-full transition-all" style="width: ${(index + 1) / quizQuestions.length * 100}%"></div>
            </div>
            <div class="text-right text-sm text-apple-gray-500 dark:text-apple-gray-400 mb-8">
                Question ${index + 1} of ${quizQuestions.length} ✨
            </div>
        `;
        
        // 构建问题HTML
        questionElement.innerHTML = `
            ${progressBar}
            <h3 class="text-2xl font-semibold mb-4 animate-float">${question.title}</h3>
            <p class="text-xl mb-8">${question.question}</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${question.options.map((option, optionIndex) => `
                    <button class="option-card glass-effect p-6 rounded-xl hover:shadow-lg transition-all text-left flex items-start transform hover:-translate-y-1 duration-300 relative overflow-hidden" 
                            data-value="${option.value}" data-index="${optionIndex}">
                        <div class="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-apple-purple/10 to-apple-pink/10 opacity-0 hover:opacity-100 transition-opacity"></div>
                        <span class="text-4xl mr-4 animate-float" style="animation-delay: ${0.2 * optionIndex}s">${option.emoji}</span>
                        <div class="relative z-10">
                            <h4 class="font-semibold text-lg">${option.title}</h4>
                        </div>
                    </button>
                `).join('')}
            </div>
        `;
        
        // 清空容器并添加问题
        quizContainer.innerHTML = '';
        quizContainer.appendChild(questionElement);
        
        // 添加选项点击事件
        const optionCards = document.querySelectorAll('.option-card');
        optionCards.forEach(card => {
            card.addEventListener('click', function() {
                // 高亮选中选项
                optionCards.forEach(c => {
                    c.classList.remove('ring-2', 'ring-apple-pink');
                    c.querySelector('.absolute').classList.remove('opacity-100');
                    c.querySelector('.absolute').classList.add('opacity-0');
                });
                
                this.classList.add('ring-2', 'ring-apple-pink');
                this.querySelector('.absolute').classList.remove('opacity-0');
                this.querySelector('.absolute').classList.add('opacity-100');
                
                // 添加选中效果
                const selectedEmoji = document.createElement('div');
                selectedEmoji.className = 'absolute top-2 right-2 text-apple-pink text-lg animate-pulse';
                selectedEmoji.textContent = '✓';
                this.appendChild(selectedEmoji);
                
                // 保存用户选择
                const selectedValue = this.getAttribute('data-value');
                const selectedIndex = parseInt(this.getAttribute('data-index'));
                
                // 延迟进入下一题，给用户一个视觉反馈
                setTimeout(() => {
                    userSelections.push({
                        questionId: question.id,
                        value: selectedValue,
                        optionData: question.options[selectedIndex]
                    });
                    
                    // 淡出效果
                    questionElement.style.opacity = '0';
                    questionElement.style.transform = 'translateY(-10px)';
                    questionElement.style.transition = 'opacity 0.3s, transform 0.3s';
                    
                    // 显示下一题
                    setTimeout(() => {
                        currentQuestion++;
                        showQuestion(currentQuestion);
                    }, 300);
                }, 600);
            });
        });
    }

    // 显示结果
    function showResults() {
        // 分析用户选择并生成香水推荐
        const recommendations = generatePerfumeRecommendations(userSelections);
        
        // 确定用户的主要香调偏好
        const userPerfumeProfile = determineUserPerfumeProfile(userSelections);
        
        // 隐藏问卷部分
        quizContainer.innerHTML = '';
        
        // 创建结果元素，告知用户正在生成推荐
        const resultsElement = document.createElement('div');
        resultsElement.className = 'quiz-results animate-fade-in';
        
        // 构建临时结果HTML
        resultsElement.innerHTML = `
            <h3 class="text-2xl font-semibold mb-6 text-center">✨ Analyzing Your Preferences ✨</h3>
            <p class="text-xl mb-8 text-center">We're crafting the perfect fragrance selection just for you...</p>
            <div class="flex justify-center items-center flex-col">
                <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-apple-pink mb-4"></div>
                <div class="text-sm text-apple-gray-500 dark:text-apple-gray-400 animate-pulse">Discovering your scent personality...</div>
            </div>
        `;
        
        // 添加临时结果
        quizContainer.appendChild(resultsElement);
        
        // 显示推荐香水产品部分
        setTimeout(() => {
            // 获取推荐香水区域
            const recommendationsContainer = document.getElementById('perfume-recommendations');
            
            // 更新推荐香水的内容
            updateRecommendationsSection(recommendationsContainer, recommendations);
            
            // 显示科普内容区域
            createAndAddEducationSection(recommendationsContainer, userPerfumeProfile);
            
            // 显示推荐香水区域
            recommendationsContainer.classList.remove('hidden');
            
            // 平滑滚动到推荐区域
            recommendationsContainer.scrollIntoView({ 
                behavior: 'smooth' 
            });
            
            // 添加气泡效果
            const bubbles = ['✨', '🌸', '💫', '🌿', '💭'];
            for (let i = 0; i < 10; i++) {
                const bubble = document.createElement('div');
                const randomBubble = bubbles[Math.floor(Math.random() * bubbles.length)];
                const size = Math.random() * 20 + 10;
                
                bubble.innerHTML = randomBubble;
                bubble.className = 'fixed text-xl animate-scent';
                bubble.style.fontSize = `${size}px`;
                bubble.style.left = `${Math.random() * 100}%`;
                bubble.style.top = `${Math.random() * 100}%`;
                bubble.style.opacity = '0.4';
                bubble.style.animationDelay = `${Math.random() * 5}s`;
                bubble.style.zIndex = '-1';
                
                document.body.appendChild(bubble);
                
                setTimeout(() => {
                    bubble.remove();
                }, 8000);
            }
            
            // 添加重新开始按钮
            const restartButton = document.createElement('div');
            restartButton.className = 'text-center mt-12';
            restartButton.innerHTML = `
                <button id="restart-quiz" class="bg-apple-pink hover:bg-apple-pink/90 text-white font-semibold py-4 px-10 rounded-full text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 group relative overflow-hidden">
                    <span class="relative z-10">✨ Discover More Scents ✨</span>
                    <span class="absolute inset-0 bg-gradient-to-r from-apple-purple to-apple-pink opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </button>
            `;
            
            recommendationsContainer.appendChild(restartButton);
            
            // 添加重新开始按钮事件
            document.getElementById('restart-quiz').addEventListener('click', function() {
                // 重置参数
                currentQuestion = 0;
                userSelections = [];
                
                // 隐藏推荐区域
                recommendationsContainer.classList.add('hidden');
                
                // 如果有存在的重启按钮，移除它
                if (document.getElementById('restart-quiz')) {
                    document.getElementById('restart-quiz').parentElement.remove();
                }
                
                // 清除所有气泡
                document.querySelectorAll('.animate-scent').forEach(bubble => bubble.remove());
                
                // 显示介绍页
                const introElement = document.createElement('div');
                introElement.className = 'quiz-intro animate-fade-in text-center';
                introElement.innerHTML = `
                    <p class="text-xl mb-10 max-w-3xl mx-auto">Your journey to the perfect signature scent begins with a few simple questions about your preferences and personality. 🌸</p>
                    <button id="start-quiz" class="bg-apple-pink hover:bg-apple-pink/90 text-white font-semibold py-4 px-10 rounded-full text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 relative overflow-hidden group">
                        <span class="relative z-10">✨ Start Your Scent Journey ✨</span>
                        <span class="absolute inset-0 bg-gradient-to-r from-apple-purple to-apple-pink opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    </button>
                `;
                
                quizContainer.innerHTML = '';
                quizContainer.appendChild(introElement);
                
                // 平滑滚动到问卷区域
                document.getElementById('quiz').scrollIntoView({ 
                    behavior: 'smooth' 
                });
                
                // 重新绑定开始按钮事件
                document.getElementById('start-quiz').addEventListener('click', function() {
                    document.querySelector('.quiz-intro').classList.add('hidden');
                    showQuestion(currentQuestion);
                });
                
                // 重新初始化幻灯片
                if (document.querySelector('.slideshow-container')) {
                    initSlideshow();
                }
            });
        }, 1800); // 1.8秒后显示香水推荐，给用户感觉是在"分析"他们的选择
    }

    // 根据用户选择生成具体香水推荐
    function generatePerfumeRecommendations(selections) {
        // 收集所有的价值标识符和笔记
        const selectedValues = selections.map(s => s.value);
        const allNotes = selections.flatMap(s => s.optionData.notes);
        
        // 创建推荐评分系统
        let perfumeScores = {};
        
        // 为每个香水初始化评分
        perfumeData.forEach(perfume => {
            perfumeScores[perfume.id] = 0;
            
            // 基于直接匹配增加分数
            perfume.suitedFor.forEach(trait => {
                if (selectedValues.includes(trait)) {
                    perfumeScores[perfume.id] += 3;
                }
            });
            
            // 基于笔记匹配增加分数
            allNotes.forEach(note => {
                const allPerfumeNotes = [
                    ...perfume.notes.top, 
                    ...perfume.notes.middle, 
                    ...perfume.notes.base
                ].map(n => n.toLowerCase());
                
                if (allPerfumeNotes.some(n => n.includes(note) || note.includes(n))) {
                    perfumeScores[perfume.id] += 1;
                }
            });
            
            // 添加一些随机性以避免完全相同的结果
            perfumeScores[perfume.id] += Math.random() * 0.5;
        });
        
        // 根据评分对香水进行排序
        const sortedPerfumes = Object.entries(perfumeScores)
            .sort((a, b) => b[1] - a[1])
            .map(([id]) => perfumeData.find(p => p.id === parseInt(id)));
        
        // 返回前4个推荐
        return sortedPerfumes.slice(0, 4);
    }

    // 更新推荐香水区域
    function updateRecommendationsSection(container, recommendations) {
        // 更新标题
        const titleElement = container.querySelector('h2');
        titleElement.textContent = "✨ Your Perfect Perfume Matches ✨";
        
        // 更新描述
        const descriptionElement = container.querySelector('p');
        descriptionElement.innerHTML = "Based on your unique preferences, we've curated these <span class='text-apple-pink font-semibold'>exclusive fragrances</span> that will complement your personality. 🌟";
        
        // 找到卡片容器
        const cardsContainer = container.querySelector('.grid');
        cardsContainer.innerHTML = '';
        
        // 为每个推荐香水创建卡片
        recommendations.forEach((perfume, index) => {
            // 获取用户选择中与该香水匹配的选项
            const matchingSelections = userSelections.filter(selection => 
                perfume.suitedFor.includes(selection.value)
            );
            
            // 构建匹配原因文本
            let matchReason = '';
            if (matchingSelections.length > 0) {
                const selection = matchingSelections[0];
                const question = quizQuestions.find(q => q.id === selection.questionId);
                const option = question.options.find(o => o.value === selection.value);
                
                matchReason = `<div class="mt-4 bg-apple-gray-200/50 dark:bg-apple-gray-700/50 p-4 rounded-lg">
                    <span class="font-semibold text-apple-pink">✨ Why this matches you: </span>
                    Your preference for ${option.title} suggests ${option.explanation}
                </div>`;
            }
            
            // 匹配香水配置文件
            const profileBadges = perfume.profiles.map(profile => 
                `<span class="inline-block px-2 py-1 rounded-full bg-apple-purple/10 text-apple-purple text-xs mr-1 mb-1">${profile}</span>`
            ).join('');
            
            // 构建笔记展示 - 使用新的容器样式
            const notes = `
                <div class="notes-container">
                    <div class="notes-row">
                        <div class="notes-label">
                            <span class="notes-label-emoji">🍋</span>Top
                        </div>
                        <div class="flex flex-wrap gap-1">
                            ${perfume.notes.top.map(note => 
                                `<span class="note-tag note-tag-top">${note}</span>`
                            ).join('')}
                        </div>
                    </div>
                    <div class="notes-row">
                        <div class="notes-label">
                            <span class="notes-label-emoji">🌺</span>Middle
                        </div>
                        <div class="flex flex-wrap gap-1">
                            ${perfume.notes.middle.map(note => 
                                `<span class="note-tag note-tag-middle">${note}</span>`
                            ).join('')}
                        </div>
                    </div>
                    <div class="notes-row">
                        <div class="notes-label">
                            <span class="notes-label-emoji">🌲</span>Base
                        </div>
                        <div class="flex flex-wrap gap-1">
                            ${perfume.notes.base.map(note => 
                                `<span class="note-tag note-tag-base">${note}</span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            `;
            
            // 创建卡片 - 使用玻璃效果
            const card = document.createElement('div');
            card.className = 'glass-effect rounded-2xl overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2';
            card.innerHTML = `
                <div class="h-64 overflow-hidden relative">
                    <div class="absolute top-3 left-3 bg-apple-purple text-white px-3 py-1 rounded-full text-sm font-medium z-10 shadow-md">
                        ✨ Match #${index + 1}
                    </div>
                    <img src="${perfume.image}" alt="${perfume.name}" class="w-full h-full object-cover transition-transform duration-700 hover:scale-110">
                </div>
                <div class="p-6">
                    <h3 class="text-2xl font-semibold mb-2">${perfume.name}</h3>
                    <div class="mb-3">
                        ${profileBadges}
                    </div>
                    <p class="text-apple-gray-700 dark:text-apple-gray-300 mb-3">${perfume.description}</p>
                    ${notes}
                    ${matchReason}
                    <div class="flex justify-between items-center mt-5">
                        <span class="text-lg font-semibold">${perfume.price}</span>
                        <a href="#" class="bg-apple-blue hover:bg-apple-blue/90 text-white py-2 px-5 rounded-full text-sm transition-all transform hover:-translate-y-1 shadow-md hover:shadow-lg">
                            ✨ Learn More
                        </a>
                    </div>
                </div>
            `;
            
            cardsContainer.appendChild(card);
            
            // 添加淡入动画，错开时间
            setTimeout(() => {
                card.classList.add('animate-fade-in');
            }, 100 * index);
        });
    }

    // 确定用户的香水档案偏好
    function determineUserPerfumeProfile(selections) {
        // 收集所有的选项特征
        const allNotes = selections.flatMap(s => s.optionData.notes);
        const valueChoices = selections.map(s => s.value);
        
        // 定义香调映射
        const noteToFamily = {
            'pink_pepper': 'floral',
            'iris': 'floral',
            'patchouli': 'woody',
            'electronic_smoke': 'oriental',
            'mushroom': 'woody',
            'berry': 'fruity',
            'sea_salt': 'aquatic',
            'cedarwood': 'woody',
            'whiskey': 'oriental',
            'tobacco': 'oriental',
            'leather': 'woody',
            'amber': 'oriental',
            'synthetic_musk': 'musk',
            'ozone': 'aquatic',
            'cashmere_wood': 'woody',
            'paper': 'woody',
            'aldehydes': 'floral',
            'strange_fruits': 'fruity',
            'sweet_fruits': 'fruity',
            'candy': 'gourmand',
            'myrrh': 'oriental',
            'frankincense': 'oriental',
            'metallic': 'aquatic',
            'spray_paint': 'aquatic',
            'coffee': 'gourmand',
            'butter': 'gourmand',
            'matcha': 'green',
            'bamboo': 'green',
            'chili': 'spicy',
            'lime': 'citrus',
            'fig': 'fruity',
            'green_leaves': 'green',
            'ambergris': 'amber',
            'incense': 'oriental',
            'fir': 'woody',
            'glacier_water': 'aquatic',
            'agarwood': 'woody',
            'tea': 'green',
            'sage': 'herbal',
            'wood_smoke': 'woody',
            'volcanic': 'earthy',
            'moss': 'green',
            'velvet': 'floral',
            'gold': 'oriental',
            'coconut': 'tropical',
            'seaweed': 'aquatic',
            'metallic': 'aquatic',
            'oxygen': 'aquatic',
            'champagne': 'sparkling',
            'feather': 'powdery',
            'cannabis': 'herbal',
            'neon': 'synthetic',
            'metal': 'metallic',
            'nano': 'synthetic'
        };
        
        // 统计香调家族出现次数
        const familyCounts = {};
        allNotes.forEach(note => {
            if (noteToFamily[note]) {
                const family = noteToFamily[note];
                familyCounts[family] = (familyCounts[family] || 0) + 1;
            }
        });
        
        // 找出最常见的香调家族
        let dominantFamily = 'floral'; // 默认
        let maxCount = 0;
        
        for (const family in familyCounts) {
            if (familyCounts[family] > maxCount) {
                maxCount = familyCounts[family];
                dominantFamily = family;
            }
        }
        
        // 映射到主要香调类别
        const familyToMainProfile = {
            'floral': 'floral',
            'woody': 'woody',
            'oriental': 'oriental',
            'fruity': 'floral',
            'aquatic': 'aquatic',
            'green': 'green',
            'gourmand': 'oriental',
            'musk': 'oriental',
            'spicy': 'oriental',
            'citrus': 'citrus',
            'herbal': 'green',
            'earthy': 'woody',
            'tropical': 'aquatic',
            'metallic': 'aquatic',
            'synthetic': 'aquatic',
            'powdery': 'floral',
            'sparkling': 'citrus',
            'amber': 'oriental'
        };
        
        // 确定主要风格
        const mainProfile = familyToMainProfile[dominantFamily] || 'floral';
        
        // 确定冷知识类别
        const coldFactsMapping = {
            'grand_budapest': 'rose',
            'legend_1900': 'musk',
            'jazz': 'oud',
            'classical': 'musk',
            'renaissance': 'oud',
            'pop_art': 'citrus',
            'california': 'citrus',
            'mexico': 'citrus',
            'iching': 'oud',
            'tarot': 'rose'
        };
        
        let coldFactType = 'rose'; // 默认
        
        for (const value of valueChoices) {
            if (coldFactsMapping[value]) {
                coldFactType = coldFactsMapping[value];
                break;
            }
        }
        
        // 确定使用设备类型 (在实际场景中可以通过UA检测)
        const deviceType = window.innerWidth <= 768 ? 'mobile' : 'desktop';
        
        return {
            mainProfile: mainProfile,
            coldFactType: coldFactType,
            deviceType: deviceType
        };
    }

    // 创建并添加科普内容区域
    function createAndAddEducationSection(container, userProfile) {
        // 创建科普内容区域
        const educationSection = document.createElement('section');
        educationSection.className = 'perfume-education max-w-7xl mx-auto glass-effect rounded-3xl shadow-xl p-8 md:p-12 transform transition-all hover:shadow-2xl mt-20 animate-fade-in';
        
        // 获取合适的香调DNA内容
        const dnaContent = perfumeEducationData.dnaContent[userProfile.mainProfile] || perfumeEducationData.dnaContent.floral;
        
        // 获取合适的冷知识内容
        const coldFact = perfumeEducationData.coldFacts[userProfile.coldFactType] || perfumeEducationData.coldFacts.rose;
        
        // 随机选择一个工艺解密
        const craftSecret = perfumeEducationData.craftSecrets[Math.floor(Math.random() * perfumeEducationData.craftSecrets.length)];
        
        // 随机选择一个行业揭秘
        const industrySecret = perfumeEducationData.industrySecrets[Math.floor(Math.random() * perfumeEducationData.industrySecrets.length)];
        
        // 随机选择一个科学跨界
        const scienceCrossover = perfumeEducationData.scienceCrossover[Math.floor(Math.random() * perfumeEducationData.scienceCrossover.length)];
        
        // 获取合适的实用技巧
        const practicalTip = perfumeEducationData.practicalTips[userProfile.deviceType];
        
        // 获取互动内容
        const interactiveContent = perfumeEducationData.interactiveContent;
        
        // 获取转化入口
        const conversionEntry = perfumeEducationData.conversionEntries[userProfile.mainProfile] || perfumeEducationData.conversionEntries.floral;
        
        // 构建科普内容HTML
        educationSection.innerHTML = `
            <h2 class="text-3xl font-bold mb-8 text-center">✨ Expand Your Fragrance Knowledge ✨</h2>
            
            <!-- 用户相关内容 -->
            <div class="mb-16">
                <h3 class="text-2xl font-semibold mb-6 text-center">Your Scent DNA</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- 香调DNA -->
                    <div class="glass-effect rounded-2xl overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 p-6">
                        <h4 class="text-xl font-medium mb-4">${dnaContent.title}</h4>
                        ${dnaContent.content}
                    </div>
                    
                    <!-- 专属冷知识 -->
                    <div class="glass-effect rounded-2xl overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 p-6">
                        <h4 class="text-xl font-medium mb-4">${coldFact.title}</h4>
                        ${coldFact.content}
                    </div>
                </div>
            </div>
            
            <!-- 通用科普内容 -->
            <div class="mb-16">
                <h3 class="text-2xl font-semibold mb-6 text-center">Perfume Industry Insights</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- 工艺解密 -->
                    <div class="glass-effect rounded-2xl overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 p-6">
                        <h4 class="text-xl font-medium mb-4">${craftSecret.title}</h4>
                        ${craftSecret.content}
                    </div>
                    
                    <!-- 行业揭秘 -->
                    <div class="glass-effect rounded-2xl overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 p-6">
                        <h4 class="text-xl font-medium mb-4">${industrySecret.title}</h4>
                        ${industrySecret.content}
                    </div>
                </div>
            </div>
            
            <!-- 场景化生活方式 -->
            <div class="mb-16">
                <h3 class="text-2xl font-semibold mb-6 text-center">Fragrance Lifestyle</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- 气味与科学跨界 -->
                    <div class="glass-effect rounded-2xl overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 p-6">
                        <h4 class="text-xl font-medium mb-4">${scienceCrossover.title}</h4>
                        ${scienceCrossover.content}
                    </div>
                    
                    <!-- 实用技巧 -->
                    <div class="glass-effect rounded-2xl overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 p-6">
                        <h4 class="text-xl font-medium mb-4">${practicalTip.title}</h4>
                        ${practicalTip.content}
                    </div>
                </div>
            </div>
            
            <!-- 互动与转化 -->
            <div class="mb-8">
                <div class="glass-effect rounded-2xl overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 p-6">
                    <h4 class="text-xl font-medium mb-4">${interactiveContent.title}</h4>
                    ${interactiveContent.content}
                </div>
            </div>
            
            <!-- 转化入口 -->
            <div class="text-center mt-12">
                <a href="#" class="bg-apple-blue hover:bg-apple-blue/90 text-white font-semibold py-4 px-10 rounded-full text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center group relative overflow-hidden">
                    <span class="relative z-10">${conversionEntry.text}</span>
                    <span class="ml-2 relative z-10">✨</span>
                    <span class="absolute inset-0 bg-gradient-to-r from-apple-purple to-apple-blue opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </a>
            </div>
        `;
        
        // 添加科普内容到容器
        container.appendChild(educationSection);
        
        // 添加交互事件
        setTimeout(() => {
            // 为所有按钮添加点击动画
            const buttons = educationSection.querySelectorAll('.apple-button');
            buttons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // 添加点击波浪效果
                    const ripple = document.createElement('span');
                    ripple.className = 'absolute inset-0 bg-white/20 rounded-full scale-0';
                    ripple.style.transform = 'scale(0)';
                    ripple.style.animation = 'ripple 0.6s linear';
                    ripple.style.transformOrigin = 'center';
                    
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 700);
                    
                    // 显示一个简单的提示
                    const actionText = this.textContent;
                    alert(`Feature coming soon: ${actionText}`);
                });
            });
        }, 100);
    }
});

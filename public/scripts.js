document.addEventListener('DOMContentLoaded', function() {
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
                    description: "Symmetrical aesthetics → Vintage pink pepper + iris, elegant and intellectual",
                    value: "grand_budapest",
                    notes: ["pink_pepper", "iris"],
                    complexity: 3
                },
                {
                    emoji: "🌌",
                    title: "Blade Runner 2049",
                    description: "Cyberpunk → Metallic patchouli + electronic smoke notes",
                    value: "blade_runner",
                    notes: ["patchouli", "electronic_smoke"],
                    complexity: 5
                },
                {
                    emoji: "🍄",
                    title: "Alice in Wonderland",
                    description: "Fantasy adventure → Psychedelic mushroom + berry gourmand notes",
                    value: "alice",
                    notes: ["mushroom", "berry"],
                    complexity: 4
                },
                {
                    emoji: "🎻",
                    title: "The Legend of 1900",
                    description: "Classical romance → Sea salt + vintage cedarwood",
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
                    description: "→ Whiskey + tobacco notes",
                    value: "jazz",
                    notes: ["whiskey", "tobacco"],
                    intensity: 4
                },
                {
                    emoji: "🎸",
                    title: "Classic Rock (Queen)",
                    description: "→ Leather + amber",
                    value: "rock",
                    notes: ["leather", "amber"],
                    intensity: 5
                },
                {
                    emoji: "🎹",
                    title: "Electronic Music (Daft Punk)",
                    description: "→ Synthetic musk + ozone elements",
                    value: "electronic",
                    notes: ["synthetic_musk", "ozone"],
                    intensity: 2
                },
                {
                    emoji: "🎻",
                    title: "Classical Music (Bach)",
                    description: "→ Cashmere wood + old paper scent",
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
                    description: "→ Fantastic aldehydes",
                    value: "surrealism",
                    notes: ["aldehydes", "strange_fruits"],
                    quirkiness: 5
                },
                {
                    emoji: "🎪",
                    title: "Pop Art",
                    description: "→ Sweet fruit notes",
                    value: "pop_art",
                    notes: ["sweet_fruits", "candy"],
                    quirkiness: 3
                },
                {
                    emoji: "🏛️",
                    title: "Renaissance",
                    description: "→ Myrrh + frankincense",
                    value: "renaissance",
                    notes: ["myrrh", "frankincense"],
                    quirkiness: 1
                },
                {
                    emoji: "🖌️",
                    title: "Street Art",
                    description: "→ Spray paint metallic notes",
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
                    description: "Croissant + black coffee → Coffee + butter notes",
                    value: "paris",
                    notes: ["coffee", "butter"],
                    region: "europe"
                },
                {
                    emoji: "🍵",
                    title: "Kyoto Tea Room",
                    description: "Matcha + wagashi → Matcha + bamboo freshness",
                    value: "kyoto",
                    notes: ["matcha", "bamboo"],
                    region: "asia"
                },
                {
                    emoji: "🌮",
                    title: "Mexico City Market",
                    description: "Chili sauce + corn tortillas → Chili + lime notes",
                    value: "mexico",
                    notes: ["chili", "lime"],
                    region: "america"
                },
                {
                    emoji: "🥑",
                    title: "California Health Breakfast",
                    description: "Avocado toast → Fig + green leaves notes",
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
                    description: "→ Ambergris + mysterious incense",
                    value: "tarot",
                    notes: ["ambergris", "incense"],
                    spirituality: 5
                },
                {
                    emoji: "🌌",
                    title: "Nordic Runes",
                    description: "→ Cold fir + glacier water aquatic notes",
                    value: "runes",
                    notes: ["fir", "glacier_water"],
                    spirituality: 3
                },
                {
                    emoji: "🐉",
                    title: "Chinese I Ching",
                    description: "→ Agarwood + pu-erh tea",
                    value: "iching",
                    notes: ["agarwood", "tea"],
                    spirituality: 4
                },
                {
                    emoji: "🌵",
                    title: "Shamanic Herbs",
                    description: "→ Sage + holy wood smoke",
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
                    description: "→ Volcanic minerals + ancient moss",
                    value: "easter_island",
                    notes: ["volcanic", "moss"],
                    adventure: 5
                },
                {
                    emoji: "🏰🎭",
                    title: "Vienna Opera House",
                    description: "→ Velvet + gilded decoration notes",
                    value: "vienna",
                    notes: ["velvet", "gold"],
                    adventure: 2
                },
                {
                    emoji: "🏄‍♂️🌴",
                    title: "Bali Surfing",
                    description: "→ Coconut milk + seaweed salt notes",
                    value: "bali",
                    notes: ["coconut", "seaweed"],
                    adventure: 4
                },
                {
                    emoji: "🚀🌕",
                    title: "Moon Base",
                    description: "→ Vacuum metallic + oxygen bubble notes",
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
                    description: "→ Champagne + feather fringe notes",
                    value: "1920s",
                    notes: ["champagne", "feather"],
                    nostalgia: 4
                },
                {
                    emoji: "☮️",
                    title: "1960s Hippie Movement",
                    description: "→ Cannabis + psychedelic patchouli",
                    value: "1960s",
                    notes: ["cannabis", "patchouli"],
                    nostalgia: 3
                },
                {
                    emoji: "🪩",
                    title: "1980s Disco Fever",
                    description: "→ Neon tube-like synthetic notes",
                    value: "1980s",
                    notes: ["synthetic", "neon"],
                    nostalgia: 2
                },
                {
                    emoji: "🤖",
                    title: "3020s Future City",
                    description: "→ Liquid metal + nano-particle notes",
                    value: "3020s",
                    notes: ["metal", "nano"],
                    nostalgia: 0
                }
            ]
        }
    ];

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
            <div class="progress-bar mb-8">
                <div class="progress-bar-fill" style="width: ${(index + 1) / quizQuestions.length * 100}%"></div>
            </div>
        `;
        
        // 构建问题HTML
        questionElement.innerHTML = `
            ${progressBar}
            <h3 class="text-2xl font-semibold mb-6">${question.title}</h3>
            <p class="text-xl mb-8">${question.question}</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${question.options.map((option, optionIndex) => `
                    <button class="option-card bg-apple-gray-100 dark:bg-apple-gray-800 p-6 rounded-xl hover:shadow-md transition-all text-left flex items-start" 
                            data-value="${option.value}" data-index="${optionIndex}">
                        <span class="text-3xl mr-4">${option.emoji}</span>
                        <div>
                            <h4 class="font-semibold mb-1">${option.title}</h4>
                            <p class="text-apple-gray-700 dark:text-apple-gray-300">${option.description}</p>
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
                // 保存用户选择
                const selectedValue = this.getAttribute('data-value');
                const selectedIndex = parseInt(this.getAttribute('data-index'));
                userSelections.push({
                    questionId: question.id,
                    value: selectedValue,
                    optionData: question.options[selectedIndex]
                });
                
                // 显示下一题
                currentQuestion++;
                setTimeout(() => {
                    showQuestion(currentQuestion);
                }, 300);
            });
        });
    }

    // 显示结果
    function showResults() {
        // 分析用户选择并生成香水推荐
        const recommendations = analyzeSelections(userSelections);
        
        // 创建结果元素
        const resultsElement = document.createElement('div');
        resultsElement.className = 'quiz-results animate-fade-in';
        
        // 构建结果HTML
        resultsElement.innerHTML = `
            <h3 class="text-2xl font-semibold mb-6">Your Perfume Recommendations</h3>
            <p class="text-xl mb-8">Based on your unique preferences, we've curated these perfumes that match your personality.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                ${recommendations.map((rec, index) => `
                    <div class="result-card bg-white dark:bg-apple-gray-800 p-6 rounded-xl shadow-lg">
                        <div class="flex items-center mb-4">
                            <span class="text-3xl mr-3">${rec.emoji}</span>
                            <h4 class="text-xl font-semibold">${rec.name}</h4>
                        </div>
                        <p class="text-apple-gray-700 dark:text-apple-gray-300 mb-3">${rec.description}</p>
                        <div class="flex flex-wrap gap-2 mt-4">
                            ${rec.notes.map(note => `
                                <span class="px-3 py-1 bg-apple-gray-100 dark:bg-apple-gray-700 rounded-full text-sm">
                                    ${note}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="text-center">
                <button id="restart-quiz" class="bg-apple-blue hover:bg-apple-blue/90 text-white font-semibold py-3 px-8 rounded-full text-lg transition-all">
                    Retake Quiz
                </button>
            </div>
        `;
        
        // 清空容器并添加结果
        quizContainer.innerHTML = '';
        quizContainer.appendChild(resultsElement);
        
        // 添加重新开始按钮事件
        document.getElementById('restart-quiz').addEventListener('click', function() {
            currentQuestion = 0;
            userSelections = [];
            document.querySelector('.quiz-results').classList.add('hidden');
            
            // 显示介绍页
            const introElement = document.createElement('div');
            introElement.className = 'quiz-intro animate-fade-in';
            introElement.innerHTML = `
                <p class="text-xl mb-8">Answer our unique personality quiz to discover perfumes that match your aesthetic and cultural preferences.</p>
                <button id="start-quiz" class="bg-apple-blue hover:bg-apple-blue/90 text-white font-semibold py-3 px-8 rounded-full text-lg transition-all">
                    Start The Quiz
                </button>
            `;
            
            quizContainer.innerHTML = '';
            quizContainer.appendChild(introElement);
            
            // 重新绑定开始按钮事件
            document.getElementById('start-quiz').addEventListener('click', function() {
                document.querySelector('.quiz-intro').classList.add('hidden');
                showQuestion(currentQuestion);
            });
        });
    }

    // 分析用户选择并生成推荐
    function analyzeSelections(selections) {
        // 这里只是示例逻辑，实际产品中可以更复杂
        const allNotes = selections.flatMap(s => s.optionData.notes);
        const uniqueNotes = [...new Set(allNotes)];
        
        // 常见的香水推荐模板
        const perfumeTemplates = [
            {
                name: "Ethereal Dreamscape",
                description: "A complex, layered scent that evolves throughout the day, revealing new facets of your personality.",
                emoji: "✨",
                baseNotes: ["amber", "musk", "cedarwood"]
            },
            {
                name: "Velvet Noir",
                description: "A mysterious, sophisticated fragrance with depth and intrigue that leaves a memorable impression.",
                emoji: "🌃",
                baseNotes: ["tobacco", "leather", "vanilla"]
            },
            {
                name: "Luminous Aura",
                description: "A bright, uplifting scent that enhances your natural energy and draws people to your optimistic presence.",
                emoji: "🌞",
                baseNotes: ["citrus", "white flowers", "green_leaves"]
            },
            {
                name: "Mystic Veil",
                description: "An otherworldly blend that transcends conventional perfumery, for those who walk between worlds.",
                emoji: "🌙",
                baseNotes: ["incense", "wood_smoke", "moss"]
            }
        ];
        
        // 生成个性化推荐
        const recommendations = [];
        
        // 根据用户选择选择模板
        let selectedTemplate;
        
        // 电影选择偏向复杂度
        const movieChoice = selections.find(s => s.questionId === 1);
        if (movieChoice && movieChoice.optionData.complexity > 3) {
            selectedTemplate = perfumeTemplates[0]; // 复杂的Ethereal Dreamscape
        } else {
            selectedTemplate = perfumeTemplates[2]; // 简单的Luminous Aura
        }
        
        // 添加第一个推荐
        recommendations.push({
            name: selectedTemplate.name,
            description: selectedTemplate.description,
            emoji: selectedTemplate.emoji,
            notes: [...selectedTemplate.baseNotes, ...uniqueNotes.slice(0, 3)]
        });
        
        // 音乐选择影响第二个推荐
        const musicChoice = selections.find(s => s.questionId === 2);
        if (musicChoice && (musicChoice.value === "jazz" || musicChoice.value === "rock")) {
            recommendations.push({
                name: "Vintage Vinyl",
                description: "A bold, statement-making fragrance that's unapologetically authentic and full of character.",
                emoji: "🎵",
                notes: ["leather", "tobacco", "amber", ...uniqueNotes.slice(0, 2)]
            });
        } else {
            recommendations.push({
                name: "Harmonic Essence",
                description: "A perfectly balanced composition that creates harmony and tranquility wherever you go.",
                emoji: "🌊",
                notes: ["sea_salt", "cashmere_wood", "synthetic_musk", ...uniqueNotes.slice(0, 2)]
            });
        }
        
        // 根据神秘学选择添加第三个推荐
        const mysticalChoice = selections.find(s => s.questionId === 5);
        if (mysticalChoice) {
            recommendations.push({
                name: "Sacred Temple",
                description: "An ancient, spiritual blend that connects you to forgotten wisdom and hidden knowledge.",
                emoji: "🏮",
                notes: [...mysticalChoice.optionData.notes, "ambergris", "vanilla"]
            });
        }
        
        return recommendations;
    }
});

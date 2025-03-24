document.addEventListener('DOMContentLoaded', function() {
    // 添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 为所有按钮添加涟漪效果
    const buttons = document.querySelectorAll('button, .btn-fancy');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // 为玻璃态卡片添加悬停效果
    const glassCards = document.querySelectorAll('.glass-effect');
    glassCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('card-active');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('card-active');
        });
    });
    
    // 原有的幻灯片控制函数
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
                // 为第一张幻灯片添加入场动画
                slide.style.animation = 'fadeIn 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards';
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
        
        // 启动轮播定时器函数 - 使用更平滑的过渡
        function startSlideInterval() {
            clearInterval(slideInterval); // 清除现有定时器
            slideInterval = setInterval(nextSlide, 5000); // 增加时间间隔到5秒，给用户更多观看时间
            console.log("开始自动轮播");
        }
        
        // 点击导航点切换幻灯片 - 添加更平滑的过渡
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                clearInterval(slideInterval);
                showSlide(index);
                startSlideInterval();
                
                // 添加点击反馈
                this.classList.add('dot-clicked');
                setTimeout(() => {
                    this.classList.remove('dot-clicked');
                }, 300);
            });
        });
        
        // 显示指定幻灯片 - 改进过渡效果
        function showSlide(index) {
            console.log(`显示幻灯片 ${index}`);
            
            // 先淡出当前幻灯片
            if (slides[currentSlide]) {
                const currentSlideEl = slides[currentSlide];
                currentSlideEl.style.opacity = '1';
                currentSlideEl.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                
                // 触发回流以应用过渡
                currentSlideEl.offsetHeight;
                
                currentSlideEl.style.opacity = '0';
                
                setTimeout(() => {
                    // 然后切换类，准备显示新幻灯片
                    slides.forEach((slide) => {
                        slide.classList.remove('active');
                    });
                    
                    dots.forEach((dot) => {
                        dot.classList.remove('active');
                    });
                    
                    // 设置新幻灯片为活动，并淡入
                    slides[index].classList.add('active');
                    slides[index].style.opacity = '0';
                    slides[index].style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    
                    // 触发回流以应用过渡
                    slides[index].offsetHeight;
                    
                    slides[index].style.opacity = '1';
                    dots[index].classList.add('active');
                    
                    currentSlide = index;
                }, 400); // 等待淡出完成一半
            } else {
                // 直接设置新幻灯片
                slides.forEach((slide) => slide.classList.remove('active'));
                dots.forEach((dot) => dot.classList.remove('active'));
                
                slides[index].classList.add('active');
                slides[index].style.opacity = '0';
                slides[index].style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                slides[index].offsetHeight;
                slides[index].style.opacity = '1';
                dots[index].classList.add('active');
                
                currentSlide = index;
            }
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
            brand: "Chanel",
            name: "No. 5",
            price: "$350",
            image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=704&q=80",
            description: "The legendary fragrance known for its complex floral composition and rich emotional expression.",
            profiles: ["sophisticated", "iconic", "feminine", "elegant", "complex", "timeless"],
            suitedFor: ["romance", "night", "classics", "formal"],
            notes: {
                top: ["aldehydes", "bergamot", "lemon", "neroli"],
                middle: ["jasmine", "rose", "lily of the valley", "iris"],
                base: ["vetiver", "sandalwood", "vanilla", "amber", "patchouli"]
            }
        },
        {
            id: 2,
            brand: "Dior",
            name: "Sauvage",
            price: "$155",
            image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
            description: "A powerful blend of fresh and woody notes, embodying the spirit of modern masculinity.",
            profiles: ["fresh", "masculine", "powerful", "modern", "intense"],
            suitedFor: ["everyday", "business", "outdoors", "confidence"],
            notes: {
                top: ["bergamot", "pepper", "ambroxan"],
                middle: ["lavender", "pink pepper", "sichuan pepper", "vetiver"],
                base: ["ambroxan", "cedar", "labdanum"]
            }
        },
        {
            id: 3,
            brand: "Tom Ford",
            name: "Tobacco Vanille",
            price: "$375",
            image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
            description: "An opulent blend of tobacco and vanilla creating a warm, oriental experience.",
            profiles: ["warm", "luxurious", "rich", "sweet", "addictive", "unisex"],
            suitedFor: ["winter", "evening", "luxury", "comfort"],
            notes: {
                top: ["tobacco leaf", "spices"],
                middle: ["vanilla", "cacao", "tonka bean"],
                base: ["dry fruits", "woody notes"]
            }
        },
        {
            id: 4,
            brand: "Creed",
            name: "Aventus",
            price: "$445",
            image: "https://images.unsplash.com/photo-1615354650192-e25b833531e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
            description: "An inspiring masculine fragrance that blends fruity, musky, and woody notes, symbolizing success and power.",
            profiles: ["confident", "masculine", "distinctive", "sophisticated", "fresh"],
            suitedFor: ["success", "business", "confidence", "leadership"],
            notes: {
                top: ["bergamot", "blackcurrant", "apple", "pineapple"],
                middle: ["rose", "birch", "moroccan jasmine", "patchouli"],
                base: ["musk", "oak moss", "ambergris", "vanilla"]
            }
        },
        {
            id: 5,
            brand: "Jo Malone",
            name: "Wood Sage & Sea Salt",
            price: "$150",
            image: "https://images.unsplash.com/photo-1553691158-e6ec3c3d9e87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
            description: "A fresh marine scent blended with warm woody notes, like a natural walk along the coastline.",
            profiles: ["fresh", "natural", "light", "mineral", "beachy", "unisex"],
            suitedFor: ["summer", "casual", "outdoors", "relaxation"],
            notes: {
                top: ["ambrette seeds", "sea salt"],
                middle: ["sage", "seaweed"],
                base: ["driftwood", "ambergris", "musk"]
            }
        },
        {
            id: 6,
            brand: "Byredo",
            name: "Gypsy Water",
            price: "$280",
            image: "https://images.unsplash.com/photo-1612116125683-499623fb1730?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
            description: "Inspired by the free spirit of Romani culture, a pure creation that blends forest and musk notes.",
            profiles: ["natural", "fresh", "woody", "mysterious", "unisex", "romantic"],
            suitedFor: ["everyday", "spiritual", "adventure", "outdoors"],
            notes: {
                top: ["bergamot", "lemon", "pepper", "juniper berries"],
                middle: ["incense", "pine needles", "orris"],
                base: ["amber", "vanilla", "sandalwood"]
            }
        },
        {
            id: 7,
            brand: "Maison Francis Kurkdjian",
            name: "Baccarat Rouge 540",
            price: "$325",
            image: "https://images.unsplash.com/photo-1616604823269-cc8dfbc2bd55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description: "A luxurious amber scent that radiates crystal-like purity and complexity, becoming a modern classic in perfumery.",
            profiles: ["luxurious", "distinctive", "sweet", "elegant", "warm", "addictive"],
            suitedFor: ["special occasions", "luxury", "romance", "evening"],
            notes: {
                top: ["saffron", "jasmine"],
                middle: ["amberwood", "cedar"],
                base: ["fir resin", "ambergris"]
            }
        },
        {
            id: 8,
            brand: "Frederic Malle",
            name: "Portrait of a Lady",
            price: "$395",
            image: "https://images.unsplash.com/photo-1600642859638-bd8fce06fe64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description: "An intense yet elegant blend of rose and spices, revealing a mysterious and sophisticated feminine allure.",
            profiles: ["sophisticated", "elegant", "intense", "complex", "opulent", "feminine"],
            suitedFor: ["evening", "formal", "romance", "winter"],
            notes: {
                top: ["rose", "cinnamon", "blackcurrant"],
                middle: ["raspberry", "clove", "patchouli"],
                base: ["sandalwood", "incense", "musk", "amber"]
            }
        },
        {
            id: 9,
            brand: "Diptyque",
            name: "Philosykos",
            price: "$190",
            image: "https://images.unsplash.com/photo-1563170352-ba54c22ec835?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
            description: "A Mediterranean fig scent that brings sunshine, greenery, and warmth to the wearer.",
            profiles: ["fresh", "natural", "mediterranean", "green", "unisex", "vibrant"],
            suitedFor: ["summer", "spring", "casual", "nature"],
            notes: {
                top: ["fig leaf", "green notes"],
                middle: ["fig fruit", "coconut"],
                base: ["cedar", "woody notes"]
            }
        },
        {
            id: 10,
            brand: "Le Labo",
            name: "Santal 33",
            price: "$215",
            image: "https://images.unsplash.com/photo-1590833058871-ad218e88abf7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
            description: "A rebellious sandalwood perfume blended with leather and spices, creating a unique personal signature.",
            profiles: ["woody", "distinctive", "unisex", "addictive", "sophisticated"],
            suitedFor: ["everyday", "signature", "urban", "creative"],
            notes: {
                top: ["violet accord", "cardamom"],
                middle: ["iris", "ambrox"],
                base: ["sandalwood", "leather", "cedar"]
            }
        },
        {
            id: 11,
            brand: "Guerlain",
            name: "Shalimar",
            price: "$160",
            image: "https://images.unsplash.com/photo-1572511354994-e14ef13fe9a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
            description: "A legendary oriental perfume telling a timeless love story, famous for its rich vanilla and amber base notes.",
            profiles: ["vintage", "opulent", "sophisticated", "sensual", "timeless", "romantic"],
            suitedFor: ["evening", "formal", "romance", "winter"],
            notes: {
                top: ["bergamot", "lemon", "cedar"],
                middle: ["jasmine", "rose", "patchouli", "vetiver"],
                base: ["vanilla", "tonka bean", "incense", "civet", "leather"]
            }
        },
        {
            id: 12,
            brand: "Issey Miyake",
            name: "L'Eau d'Issey",
            price: "$106",
            image: "https://images.unsplash.com/photo-1563132272-91a02542e938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
            description: "An aquatic floral fragrance like a clear mountain spring, symbolizing purity and the beauty of natural balance.",
            profiles: ["fresh", "aquatic", "light", "modern", "clean", "feminine"],
            suitedFor: ["everyday", "office", "spring", "summer"],
            notes: {
                top: ["lotus", "freesia", "cyclamen", "rose water"],
                middle: ["lily", "carnation"],
                base: ["sandalwood", "cedar", "amber", "musk"]
            }
        },
        {
            id: 13,
            brand: "Serge Lutens",
            name: "Ambre Sultan",
            price: "$230",
            image: "https://images.unsplash.com/photo-1578083881160-9f96d731dcdd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
            description: "A rich oriental amber fragrance blending herbs and resins, revealing desert-like mystery and wildness.",
            profiles: ["oriental", "rich", "complex", "mysterious", "bold", "intellectual"],
            suitedFor: ["winter", "evening", "artistic", "spiritual"],
            notes: {
                top: ["coriander", "bay leaf", "oregano"],
                middle: ["amber", "cistus", "angelica"],
                base: ["vanilla", "benzoin", "resins", "patchouli"]
            }
        },
        {
            id: 14,
            brand: "Comme des Garçons",
            name: "Wonderwood",
            price: "$131",
            image: "https://images.unsplash.com/photo-1618330834871-dd22c2c22e35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
            description: "A multi-layered woody exploration combining different types of wood and spices, creating a unique modern atmosphere.",
            profiles: ["woody", "architectural", "unisex", "modern", "distinctive", "intellectual"],
            suitedFor: ["urban", "creative", "autumn", "individuality"],
            notes: {
                top: ["madagascan pepper", "bergamot", "nutmeg"],
                middle: ["Virginia cedar", "Somalian incense", "guaiac wood"],
                base: ["sandalwood", "vetiver", "oud", "cashmeran"]
            }
        },
        {
            id: 15,
            brand: "Acqua di Parma",
            name: "Colonia",
            price: "$175",
            image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
            description: "A classic Italian citrus fragrance, fresh and elegant, showcasing Mediterranean charm and refined lifestyle.",
            profiles: ["fresh", "citrus", "classic", "elegant", "mediterranean", "timeless"],
            suitedFor: ["summer", "spring", "refined", "everyday"],
            notes: {
                top: ["sicilian citrus", "bergamot", "lemon", "orange"],
                middle: ["lavender", "rosemary", "verbena", "rose"],
                base: ["sandalwood", "vetiver", "patchouli", "amber"]
            }
        },
        {
            id: 16,
            brand: "Hermès",
            name: "Terre d'Hermès",
            price: "$150",
            image: "https://images.unsplash.com/photo-1590736969571-da769d512682?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
            description: "A symphony of earth and minerals, showcasing the perfect balance between nature and human creativity.",
            profiles: ["woody", "mineral", "masculine", "elegant", "earthy", "intellectual"],
            suitedFor: ["business", "outdoors", "autumn", "confidence"],
            notes: {
                top: ["orange", "grapefruit", "flint"],
                middle: ["pepper", "geranium", "flint"],
                base: ["vetiver", "cedar", "patchouli", "benzoin"]
            }
        },
        {
            id: 17,
            brand: "Maison Margiela",
            name: "Jazz Club",
            price: "$144",
            image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
            description: "Warm tobacco and rum notes that transport you to a vintage jazz club, creating a nostalgic experience.",
            profiles: ["warm", "boozy", "sweet", "vintage", "rich", "nostalgic"],
            suitedFor: ["evening", "winter", "social", "nostalgic"],
            notes: {
                top: ["pink pepper", "lemon", "neroli"],
                middle: ["rum", "clary sage", "vetiver"],
                base: ["tobacco leaf", "vanilla", "styrax"]
            }
        },
        {
            id: 18,
            brand: "Penhaligon's",
            name: "Halfeti",
            price: "$285",
            image: "https://images.unsplash.com/photo-1620868489300-566a646a2e76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
            description: "Inspired by rare Turkish black roses, this fragrance blends spices and leather, representing the luxurious fusion of East and West.",
            profiles: ["oriental", "opulent", "complex", "mysterious", "luxurious", "bold"],
            suitedFor: ["special occasions", "evening", "winter", "luxury"],
            notes: {
                top: ["bergamot", "green notes", "armoise", "cypress"],
                middle: ["cumin", "nutmeg", "violet", "saffron", "rose", "jasmine"],
                base: ["leather", "oud", "amber", "sandalwood", "tonka bean", "vanilla", "musk"]
            }
        },
        {
            id: 19,
            brand: "Frédéric Malle",
            name: "Carnal Flower",
            price: "$440",
            image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=704&q=80",
            description: "A masterpiece of modern white florals, perfectly balancing the richness and freshness of tuberose.",
            profiles: ["floral", "feminine", "ethereal", "luxurious", "complex", "sensual"],
            suitedFor: ["spring", "summer", "elegant", "confident"],
            notes: {
                top: ["bergamot", "melon", "eucalyptus"],
                middle: ["tuberose", "ylang-ylang", "jasmine", "orange blossom"],
                base: ["coconut", "musk", "white musks"]
            }
        },
        {
            id: 20,
            brand: "Comme des Garçons",
            name: "Avignon",
            price: "$155",
            image: "https://images.unsplash.com/photo-1608257817838-48322be0adeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
            description: "A profound experience like walking into a medieval cathedral, with incense and woody notes creating a mysterious spiritual atmosphere.",
            profiles: ["spiritual", "mysterious", "incense", "avant-garde", "intellectual", "ethereal"],
            suitedFor: ["spiritual", "winter", "introspection", "artistic"],
            notes: {
                top: ["Roman chamomile", "aldehydes"],
                middle: ["incense", "myrrh", "cistus"],
                base: ["vanilla", "patchouli", "cedar"]
            }
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
        
        // 创建详细的打分系统
        let perfumeScores = {};
        
        // 收集用户的风格偏好
        const userComplexity = selections
            .filter(s => s.optionData.complexity !== undefined)
            .map(s => s.optionData.complexity)
            .reduce((sum, val) => sum + val, 0) / 
                (selections.filter(s => s.optionData.complexity !== undefined).length || 1);
                
        const userIntensity = selections
            .filter(s => s.optionData.intensity !== undefined)
            .map(s => s.optionData.intensity)
            .reduce((sum, val) => sum + val, 0) / 
                (selections.filter(s => s.optionData.intensity !== undefined).length || 1);
                
        const userQuirkiness = selections
            .filter(s => s.optionData.quirkiness !== undefined)
            .map(s => s.optionData.quirkiness)
            .reduce((sum, val) => sum + val, 0) / 
                (selections.filter(s => s.optionData.quirkiness !== undefined).length || 1);
                
        const userRegions = selections
            .filter(s => s.optionData.region !== undefined)
            .map(s => s.optionData.region);
            
        const userSpirituality = selections
            .filter(s => s.optionData.spirituality !== undefined)
            .map(s => s.optionData.spirituality)
            .reduce((sum, val) => sum + val, 0) / 
                (selections.filter(s => s.optionData.spirituality !== undefined).length || 1);
                
        const userAdventure = selections
            .filter(s => s.optionData.adventure !== undefined)
            .map(s => s.optionData.adventure)
            .reduce((sum, val) => sum + val, 0) / 
                (selections.filter(s => s.optionData.adventure !== undefined).length || 1);
                
        const userNostalgia = selections
            .filter(s => s.optionData.nostalgia !== undefined)
            .map(s => s.optionData.nostalgia)
            .reduce((sum, val) => sum + val, 0) / 
                (selections.filter(s => s.optionData.nostalgia !== undefined).length || 1);
        
        // 映射香水特性到用户风格偏好
        const perfumeTraits = {
            "intellectual": { complexity: 4, intensity: 2 },
            "elegant": { complexity: 3, intensity: 2, nostalgia: 3 },
            "vintage": { complexity: 4, nostalgia: 5 },
            "warm": { intensity: 4 },
            "sophisticated": { complexity: 4 },
            "masculine": { intensity: 4 },
            "fresh": { intensity: 2, complexity: 2 },
            "natural": { complexity: 2, spirituality: 3 },
            "mediterranean": { region: "europe" },
            "iconic": { complexity: 3, nostalgia: 3 },
            "unisex": { complexity: 3 },
            "distinctive": { quirkiness: 4 },
            "luxurious": { complexity: 4, intensity: 3 },
            "rich": { intensity: 4, complexity: 3 },
            "sweet": { intensity: 3 },
            "opulent": { intensity: 5, complexity: 4 },
            "intense": { intensity: 5 },
            "avant-garde": { complexity: 5, quirkiness: 5 },
            "architectural": { complexity: 4, quirkiness: 3 },
            "modern": { nostalgia: 1 },
            "light": { intensity: 1 },
            "floral": { complexity: 3 },
            "feminine": { intensity: 2 },
            "powerful": { intensity: 4 },
            "confident": { intensity: 4 },
            "romantic": { intensity: 3, spirituality: 3 },
            "timeless": { nostalgia: 4 },
            "fruity": { intensity: 2, complexity: 2 },
            "complex": { complexity: 5 },
            "beachy": { region: "tropical" },
            "bold": { intensity: 4, quirkiness: 3 },
            "sensual": { intensity: 3 },
            "addictive": { intensity: 4 },
            "mineral": { complexity: 3, quirkiness: 3 },
            "ethereal": { spirituality: 4, complexity: 4 },
            "mysterious": { complexity: 4, spirituality: 3 },
            "classic": { nostalgia: 4 },
            "vibrant": { intensity: 3 }
        };
        
        // 为每个香水计算得分
        perfumeData.forEach(perfume => {
            perfumeScores[perfume.id] = 0;
            
            // 1. 基于选择值直接匹配增加分数
            perfume.suitedFor.forEach(trait => {
                if (selectedValues.includes(trait)) {
                    perfumeScores[perfume.id] += 4; // 直接匹配的权重更高
                }
            });
            
            // 2. 基于笔记匹配增加分数
            let noteMatchCount = 0;
            allNotes.forEach(note => {
                const allPerfumeNotes = [
                    ...perfume.notes.top, 
                    ...perfume.notes.middle, 
                    ...perfume.notes.base
                ].map(n => n.toLowerCase());
                
                // 检查是否有任何香水笔记包含用户选择的笔记
                const hasMatch = allPerfumeNotes.some(n => 
                    n.includes(note) || note.includes(n)
                );
                
                if (hasMatch) {
                    noteMatchCount++;
                }
            });
            
            // 香调匹配得分，根据匹配的笔记数量给予递增奖励
            if (noteMatchCount > 0) {
                perfumeScores[perfume.id] += Math.pow(1.5, noteMatchCount);
            }
            
            // 3. 基于香水特性与用户风格偏好的匹配
            let traitMatchScore = 0;
            perfume.profiles.forEach(profile => {
                const trait = perfumeTraits[profile];
                if (trait) {
                    // 复杂度匹配
                    if (trait.complexity !== undefined && !isNaN(userComplexity)) {
                        const complexityDiff = 5 - Math.abs(trait.complexity - userComplexity);
                        traitMatchScore += complexityDiff * 0.3;
                    }
                    
                    // 强度匹配
                    if (trait.intensity !== undefined && !isNaN(userIntensity)) {
                        const intensityDiff = 5 - Math.abs(trait.intensity - userIntensity);
                        traitMatchScore += intensityDiff * 0.3;
                    }
                    
                    // 怪奇度匹配
                    if (trait.quirkiness !== undefined && !isNaN(userQuirkiness)) {
                        const quirkinessDiff = 5 - Math.abs(trait.quirkiness - userQuirkiness);
                        traitMatchScore += quirkinessDiff * 0.3;
                    }
                    
                    // 地区匹配
                    if (trait.region && userRegions.includes(trait.region)) {
                        traitMatchScore += 2;
                    }
                    
                    // 精神性匹配
                    if (trait.spirituality !== undefined && !isNaN(userSpirituality)) {
                        const spiritualityDiff = 5 - Math.abs(trait.spirituality - userSpirituality);
                        traitMatchScore += spiritualityDiff * 0.3;
                    }
                    
                    // 冒险度匹配
                    if (trait.adventure !== undefined && !isNaN(userAdventure)) {
                        const adventureDiff = 5 - Math.abs(trait.adventure - userAdventure);
                        traitMatchScore += adventureDiff * 0.3;
                    }
                    
                    // 怀旧度匹配
                    if (trait.nostalgia !== undefined && !isNaN(userNostalgia)) {
                        const nostalgiaDiff = 5 - Math.abs(trait.nostalgia - userNostalgia);
                        traitMatchScore += nostalgiaDiff * 0.3;
                    }
                }
            });
            
            // 将特性匹配得分加到总分
            perfumeScores[perfume.id] += traitMatchScore;
            
            // 4. 价格区间偏好（假设用户喜欢中等价位）
            const price = parseInt(perfume.price.replace(/\D/g,''));
            if (price <= 100) {
                perfumeScores[perfume.id] += 0.5; // 更经济实惠
            } else if (price > 300) {
                perfumeScores[perfume.id] += 0.2; // 高端奢侈
            } else {
                perfumeScores[perfume.id] += 1; // 中等价位
            }
            
            // 5. 添加一点随机性以在多次测试中得到不同结果
            perfumeScores[perfume.id] += Math.random() * 0.5;
        });
        
        // 对香水按分数排序
        const sortedPerfumes = Object.entries(perfumeScores)
            .sort((a, b) => b[1] - a[1])
            .map(([id]) => perfumeData.find(p => p.id === parseInt(id)));
        
        // 获取前5名，但确保推荐结果多样性
        // 避免选择太多特性相似的香水
        const recommendations = [];
        const profilesIncluded = new Set();
        
        // 首先添加得分最高的香水
        if (sortedPerfumes.length > 0) {
            recommendations.push(sortedPerfumes[0]);
            sortedPerfumes[0].profiles.forEach(p => profilesIncluded.add(p));
        }
        
        // 然后基于多样性添加其他香水
        for (let i = 1; i < sortedPerfumes.length && recommendations.length < 4; i++) {
            const perfume = sortedPerfumes[i];
            
            // 计算与已包含香水的特性重叠度
            const overlapCount = perfume.profiles.filter(p => profilesIncluded.has(p)).length;
            const diversityScore = 1 - (overlapCount / perfume.profiles.length);
            
            // 如果特性重叠度低于阈值或已经选择了足够多的香水，则添加此香水
            if (diversityScore > 0.5 || recommendations.length < 2) {
                recommendations.push(perfume);
                perfume.profiles.forEach(p => profilesIncluded.add(p));
            }
        }
        
        // 如果推荐不足4个，从排序列表中继续添加
        while (recommendations.length < 4 && recommendations.length < sortedPerfumes.length) {
            const nextIndex = recommendations.length;
            if (sortedPerfumes[nextIndex] && !recommendations.includes(sortedPerfumes[nextIndex])) {
                recommendations.push(sortedPerfumes[nextIndex]);
            } else {
                break;
            }
        }
        
        return recommendations;
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
                
                matchReason = `<div class="mt-4 bg-apple-gray-100/60 dark:bg-apple-gray-700/60 p-5 rounded-xl backdrop-blur-sm">
                    <div class="flex items-center mb-2">
                        <span class="text-xl mr-2">✨</span>
                        <span class="font-semibold text-gradient">Why This Matches You</span>
                    </div>
                    <p>Your preference for <span class="font-medium">${option.title}</span> suggests ${option.explanation}</p>
                </div>`;
            }
            
            // 匹配香水配置文件 - 改进视觉展示
            const profileBadges = perfume.profiles.map(profile => 
                `<span class="inline-block px-3 py-1.5 rounded-full bg-gradient-to-r from-apple-purple/20 to-apple-pink/20 text-apple-purple dark:text-apple-pink text-xs font-medium mr-1.5 mb-1.5 transition-all hover:scale-105 hover:from-apple-purple/90 hover:to-apple-pink/90 hover:text-amber-300 dark:hover:text-cyan-300 shadow-sm">${profile}</span>`
            ).join('');
            
            // 为每种香调分配合适的emoji
            function getNoteEmoji(noteType, notes) {
                // 基于香调类型和具体成分选择合适的emoji
                const emojiMap = {
                    top: {
                        default: "🍃", // 默认顶调
                        citrus: {
                            keywords: ["bergamot", "lemon", "orange", "grapefruit", "lime", "mandarin", "citrus"],
                            emoji: ["🍋", "🍊", "🍈", "🪴", "🌞"]
                        },
                        spicy: {
                            keywords: ["pepper", "pink pepper", "sichuan pepper", "cardamom", "cinnamon", "spicy", "spice"],
                            emoji: ["🌶️", "🔥", "✨", "💫", "⚡"]
                        },
                        green: {
                            keywords: ["green notes", "fig leaf", "leaf", "green"],
                            emoji: ["🌿", "🍃", "🥬", "🌱", "🌵"]
                        },
                        fruity: {
                            keywords: ["apple", "pineapple", "blackcurrant", "berry", "melon", "fruit"],
                            emoji: ["🍎", "🍏", "🍍", "🫐", "🍓"]
                        },
                        floral: {
                            keywords: ["flower", "floral", "rose", "blooming"],
                            emoji: ["🌷", "🌹", "🌺", "🌻", "🌼"]
                        }
                    },
                    middle: {
                        default: "🌸", // 默认中调
                        floral: {
                            keywords: ["rose", "jasmine", "lily", "iris", "ylang-ylang", "tuberose", "violet", "flower"],
                            emoji: ["🌸", "🌹", "🌺", "🌻", "🌷"]
                        },
                        herbal: {
                            keywords: ["sage", "lavender", "rosemary", "clary sage", "herb"],
                            emoji: ["🌱", "🪴", "🧪", "🧴", "🌿"]
                        },
                        spicy: {
                            keywords: ["clove", "nutmeg", "cinnamon", "spice"],
                            emoji: ["🧂", "🌶️", "🔮", "⭐", "✨"]
                        },
                        woody: {
                            keywords: ["cedar", "birch", "cypress", "wood"],
                            emoji: ["🪵", "🌲", "🌳", "🧩", "🪑"]
                        },
                        fruity: {
                            keywords: ["fruit", "berry", "sweet"],
                            emoji: ["🍑", "🍒", "🍐", "🥭", "🍇"]
                        }
                    },
                    base: {
                        default: "🌫️", // 默认基调
                        woody: {
                            keywords: ["sandalwood", "cedar", "vetiver", "patchouli", "oud", "guaiac", "wood"],
                            emoji: ["🪵", "🌲", "🌳", "🏔️", "🗻"]
                        },
                        amber: {
                            keywords: ["amber", "ambergris", "benzoin"],
                            emoji: ["✨", "💫", "🔮", "💎", "🌟"]
                        },
                        sweet: {
                            keywords: ["vanilla", "tonka bean", "cacao", "sweet"],
                            emoji: ["🍯", "🧁", "🍦", "🍨", "🧊"]
                        },
                        musky: {
                            keywords: ["musk", "white musks"],
                            emoji: ["🧴", "☁️", "🌫️", "🔮", "💭"]
                        },
                        leather: {
                            keywords: ["leather", "suede"],
                            emoji: ["👜", "👛", "🧳", "📔", "🪑"]
                        },
                        balsamic: {
                            keywords: ["resin", "balsam", "myrrh", "frankincense"],
                            emoji: ["🪵", "🧬", "💧", "✨", "💫"]
                        }
                    }
                };
                
                // 为特定类型的笔记选择emoji
                let noteCategory = "default";
                let emoji = emojiMap[noteType].default;
                
                // 从笔记中检测关键词匹配
                for (const category in emojiMap[noteType]) {
                    if (category === "default") continue;
                    
                    const categoryInfo = emojiMap[noteType][category];
                    const keywords = categoryInfo.keywords;
                    const emojis = categoryInfo.emoji;
                    
                    // 寻找匹配的关键词
                    for (const note of notes) {
                        if (keywords.some(keyword => note.toLowerCase().includes(keyword.toLowerCase()))) {
                            // 随机选择一个emoji以增加多样性
                            const randomIndex = Math.floor(Math.random() * emojis.length);
                            return emojis[randomIndex];
                        }
                    }
                }
                
                return emoji;
            }
            
            // 构建笔记展示 - 使用新的卡片样式
            const topNotesEmoji = getNoteEmoji("top", perfume.notes.top);
            const middleNotesEmoji = getNoteEmoji("middle", perfume.notes.middle);
            const baseNotesEmoji = getNoteEmoji("base", perfume.notes.base);
            
            const notes = `
                <div class="mt-6 space-y-4">
                    <h4 class="text-base font-medium text-apple-gray-700 dark:text-apple-gray-300">Fragrance Notes</h4>
                    <div class="grid grid-cols-3 gap-3">
                        <div class="bg-apple-gray-100/60 dark:bg-apple-gray-700/60 rounded-xl p-3 backdrop-blur-sm">
                            <div class="flex items-center justify-center mb-2">
                                <span class="text-xl">${topNotesEmoji}</span>
                            </div>
                            <div class="text-center text-xs font-medium mb-2 text-apple-gray-500">Top Notes</div>
                            <div class="flex flex-col items-center space-y-1">
                                ${perfume.notes.top.map(note => 
                                    `<span class="text-sm text-center">${note}</span>`
                                ).join('')}
                            </div>
                        </div>
                        <div class="bg-apple-gray-100/60 dark:bg-apple-gray-700/60 rounded-xl p-3 backdrop-blur-sm">
                            <div class="flex items-center justify-center mb-2">
                                <span class="text-xl">${middleNotesEmoji}</span>
                            </div>
                            <div class="text-center text-xs font-medium mb-2 text-apple-gray-500">Middle Notes</div>
                            <div class="flex flex-col items-center space-y-1">
                                ${perfume.notes.middle.map(note => 
                                    `<span class="text-sm text-center">${note}</span>`
                                ).join('')}
                            </div>
                        </div>
                        <div class="bg-apple-gray-100/60 dark:bg-apple-gray-700/60 rounded-xl p-3 backdrop-blur-sm">
                            <div class="flex items-center justify-center mb-2">
                                <span class="text-xl">${baseNotesEmoji}</span>
                            </div>
                            <div class="text-center text-xs font-medium mb-2 text-apple-gray-500">Base Notes</div>
                            <div class="flex flex-col items-center space-y-1">
                                ${perfume.notes.base.map(note => 
                                    `<span class="text-sm text-center">${note}</span>`
                                ).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // 创建卡片 - 使用苹果风格卡片效果
            const card = document.createElement('div');
            card.className = 'glass-effect rounded-2xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 opacity-0';
            card.innerHTML = `
                <div class="relative">
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 z-10"></div>
                    <div class="absolute top-3 left-3 bg-gradient-to-r from-apple-purple to-apple-pink text-white px-3 py-1 rounded-full text-sm font-medium z-20 shadow-lg">
                        ✨ Match #${index + 1}
                    </div>
                    <div class="h-72 overflow-hidden">
                        <img src="${perfume.image}" alt="${perfume.name}" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1592845998667-7752de3dac13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80';">
                    </div>
                    <div class="absolute bottom-4 left-4 right-4 z-20">
                        <div class="bg-white/80 dark:bg-apple-gray-800/80 backdrop-blur-md px-4 py-3 rounded-xl">
                            <h3 class="text-xl font-semibold">${perfume.name}</h3>
                            <div class="flex items-center justify-between">
                                <span class="text-base font-medium">${perfume.price}</span>
                                <div class="flex space-x-1">
                                    <span class="px-2 py-1 rounded-md bg-apple-gray-200/50 dark:bg-apple-gray-700/50 text-xs">★★★★★</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-6">
                    <div class="flex flex-wrap mb-4">
                        ${profileBadges}
                    </div>
                    <p class="text-apple-gray-700 dark:text-apple-gray-300 mb-5 leading-relaxed">${perfume.description}</p>
                    ${notes}
                    ${matchReason}
                    <div class="flex justify-center items-center mt-6 pt-4 border-t border-apple-gray-200 dark:border-apple-gray-700">
                        <a href="#" class="text-apple-blue hover:underline flex items-center py-2 px-5 rounded-full text-sm transition-all transform hover:-translate-y-1">
                            <span>View Details</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </div>
            `;
            
            cardsContainer.appendChild(card);
            
            // 添加淡入动画，错开时间
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            }, 100 * index);
        });
        
        // 添加CSS样式
        if (!document.getElementById('perfume-card-styles')) {
            const styleEl = document.createElement('style');
            styleEl.id = 'perfume-card-styles';
            styleEl.textContent = `
                .text-gradient {
                    background: linear-gradient(to right, var(--apple-pink), var(--apple-purple));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `;
            document.head.appendChild(styleEl);
        }
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

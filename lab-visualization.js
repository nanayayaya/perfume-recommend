// 香水实验室可视化模块
document.addEventListener('DOMContentLoaded', function() { setTimeout(initVisualization, 1000); });

// 通过文本内容查找Laboratory Interface
function findLabInterfaceByText() {
    const divs = document.querySelectorAll('div');
    for (const div of divs) {
        if (div.textContent.includes('Laboratory Interface')) {
            return div;
        }
    }
    return null;
}
// 香调映射表
const scentFamilyMap = {
    // 香调分类: [HSL-H值, 主Emoji, 辅助Emoji数组]
    'floral': [330, '🌹', ['🌸', '💐']],    // 花香调
    'woody': [30, '🌳', ['🪵', '🪴']],     // 木质调
    'citrus': [45, '🍊', ['🍋', '🍇']],    // 柑橘调
    'aquatic': [200, '🌊', ['🌧️', '💧']],  // 水生调
    'oriental': [0, '🔥', ['🧪', '🪔']],   // 东方调
    'green': [120, '🍃', ['🌿', '☘️']]     // 绿叶调
};

// 香水成分到香调家族的映射
const ingredientToScentFamily = {
    'bergamot': 'citrus',
    'citrus': 'citrus',
    'lemon': 'citrus',
    'orange': 'citrus',
    'grapefruit': 'citrus',
    
    'rose': 'floral',
    'jasmine': 'floral',
    'lavender': 'floral',
    'flower': 'floral',
    'floral': 'floral',
    
    'sandalwood': 'woody',
    'cedar': 'woody',
    'wood': 'woody',
    'woody': 'woody',
    
    'vanilla': 'oriental',
    'amber': 'oriental',
    'spice': 'oriental',
    'oriental': 'oriental',
    
    'mint': 'green',
    'basil': 'green',
    'grass': 'green',
    'green': 'green',
    
    'ocean': 'aquatic',
    'marine': 'aquatic',
    'sea': 'aquatic',
    'aquatic': 'aquatic',
    'water': 'aquatic'
};
    // 添加辅助香调的Emoji (比例>25%的次要香调)
    Object.keys(familyRatios).forEach(family => {
        if (family !== 'other' && family !== primaryFamily && 
            familyRatios[family] > 25 && 
            scentFamilyMap[family]) {
            
            // 获取辅助emoji
            const ratio = familyRatios[family];
            const auxiliaryEmoji = document.createElement('span');
            auxiliaryEmoji.className = 'text-2xl ml-2 transition-all duration-500';
            auxiliaryEmoji.textContent = scentFamilyMap[family][1];
            auxiliaryEmoji.style.opacity = ratio / 100; // 根据比例设置透明度
            emojisContainer.appendChild(auxiliaryEmoji);
            
            // 如果辅助香调比例较高(>40%)，也添加辅助Emoji
            if (ratio > 40 && scentFamilyMap[family][2].length > 0) {
                const secondaryEmoji = document.createElement('span');
                secondaryEmoji.className = 'text-xl ml-1 transition-all duration-500';
                secondaryEmoji.textContent = scentFamilyMap[family][2][0];
                secondaryEmoji.style.opacity = (ratio - 40) / 60; // 40%以上的部分才开始显示
                emojisContainer.appendChild(secondaryEmoji);
            }
        }
    });
    
    // 如果总计正好是100%，添加完美混合效果
    if (total === 100) {
        // 添加闪光边框
        visualContainer.classList.add('ring-2', 'ring-green-300');
        
        // 添加一个特殊的完美混合emoji
        const perfectMixEmoji = document.createElement('span');
        perfectMixEmoji.className = 'text-2xl animate-pulse ml-2';
        perfectMixEmoji.textContent = '✨';
        emojisContainer.appendChild(perfectMixEmoji);
        
        // 添加光晕效果
        visualContainer.style.boxShadow = '0 0 15px rgba(255,255,255,0.5), inset 0 0 10px rgba(255,255,255,0.5)';
    } else {
        // 移除完美混合效果
        visualContainer.classList.remove('ring-2', 'ring-green-300');
        visualContainer.style.boxShadow = '';
    }
    
    // 添加简单的粒子效果
    if (total === 100) {
        addParticleEffect();
    }
}

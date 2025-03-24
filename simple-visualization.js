// 简单的香水可视化模块
console.log('简单香水可视化模块已加载');
window.addEventListener('load', function() { setTimeout(addVisualization, 1000); });
function addVisualization() {
  const labInterface = document.getElementById('laboratory-interface');
    console.log('未找到Laboratory Interface元素');
    return;
  }
  console.log('找到Laboratory Interface元素，添加可视化');
  const div = document.createElement('div');
  div.className = 'mt-8';
  div.innerHTML = '<h5 class="text-base font-medium mb-3 text-center">实时混合可视化</h5><div id="scent-visualization" style="height:128px;width:100%;border-radius:0.75rem;overflow:hidden;position:relative;background:linear-gradient(to bottom right,#f5f5f7,#d2d2d7);box-shadow:inset 0 2px 4px rgba(0,0,0,0.1);"><div id="color-blend" style="position:absolute;inset:0;opacity:0.8;transition:all 0.7s;background:linear-gradient(45deg,hsl(330,70%,80%) 30%,hsl(30,60%,75%) 70%);"></div><div id="scent-emojis" style="position:relative;z-index:10;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;height:100%;gap:0.5rem;padding:0.5rem;transition:all 0.5s;"><span style="font-size:1.875rem;line-height:2.25rem;animation:float 3s ease-in-out infinite;">🌹</span><span style="font-size:1.5rem;line-height:2rem;margin-left:0.5rem;opacity:0.6;animation:float 3s ease-in-out 0.5s infinite;">🌳</span><span style="font-size:1.5rem;line-height:2rem;margin-left:0.5rem;opacity:0.4;animation:float 3s ease-in-out 1s infinite;">🍊</span><span style="font-size:1.5rem;line-height:2rem;margin-left:0.5rem;animation:pulse 2s cubic-bezier(0.4,0,0.6,1) infinite;">✨</span></div></div><style>@keyframes float{0%{transform:translateY(0) rotate(0)}50%{transform:translateY(-10px) rotate(5deg)}100%{transform:translateY(0) rotate(0)}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}</style>';
  // 找到合适的位置添加
  const space = labInterface.querySelector('.space-y-4');
  if (space) {
    space.appendChild(div);
    console.log('已添加可视化容器到space-y-4元素');
  } else {
    labInterface.appendChild(div);
    console.log('已添加可视化容器到Laboratory Interface');
  }
}

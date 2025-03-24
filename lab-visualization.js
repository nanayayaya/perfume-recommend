// 香水实验室可视化模块 - 修复版
console.log('香水可视化模块已加载');
document.addEventListener('DOMContentLoaded', function() { transformLaboratoryInterface(); });
window.addEventListener('load', function() { setTimeout(transformLaboratoryInterface, 500); });
// 转换Laboratory Interface为交互式界面
function transformLaboratoryInterface() {
    console.log('开始转换Laboratory Interface为交互式界面');
    // 找到Laboratory Interface元素
    const labInterface = document.getElementById('laboratory-interface');

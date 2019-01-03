/*
** Create by Bunana on 2019/1/2
*/
setHtmlFontSize();
function setHtmlFontSize (){
    // 设计稿大小
    var designWidth = 750;
// 设计稿根元素大小
    var designFontSize = 200;
// 获取当前屏幕宽度
    var windowWidth = document.documentElement.offsetWidth;
// 计算当前屏幕根元素大小
    var nowFontSize = windowWidth/(designWidth/designFontSize)
// 设置到当前html元素的fontsize;
    document.documentElement.style.fontSize = nowFontSize+'px';
}
window.addEventListener('resize', setHtmlFontSize);
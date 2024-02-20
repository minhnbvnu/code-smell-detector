function getFontSize(_client) {
    let doc = document,
        win = window;
    let docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        countSize = function () {
            let clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            //如果屏幕大于750（750是根据我效果图设置的，具体数值参考效果图），就设置clientWidth=750，防止font-size会超过100px
            if (clientWidth > _client) {
                clientWidth = _client
            }
            //设置根元素font-size大小
            docEl.style.fontSize = 100 * (clientWidth / _client) + 'px';
        };
    //屏幕大小改变，或者横竖屏切换时，触发函数
    win.addEventListener(resizeEvt, countSize, false);
    //文档加载完成时，触发函数
    doc.addEventListener('DOMContentLoaded', countSize, false);
}
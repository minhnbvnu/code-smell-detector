function computeDomPosition(dom) {
    const style = window.getComputedStyle(dom);
    const padding = [
        parseInt(style['padding-left']),
        parseInt(style['padding-top'])
    ];
    const rect = dom.getBoundingClientRect();
    //fix #450, inspired by https://github.com/Leaflet/Leaflet/pull/5794/files
    const offsetWidth = dom.offsetWidth,
        offsetHeight = dom.offsetHeight;
    const scaleX = offsetWidth ? rect.width / offsetWidth : 1,
        scaleY = offsetHeight ? rect.height / offsetHeight : 1;
    dom.__position = [rect.left + padding[0], rect.top + padding[1], scaleX, scaleY];
    return dom.__position;
}
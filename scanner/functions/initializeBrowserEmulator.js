function initializeBrowserEmulator() {
    // Prevent hitches for touch event handling on Android Chrome
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners
    const options = {passive: false, capture: true};
    document.addEventListener('mousedown',   onMouseDownOrMove, options);
    document.addEventListener('mousemove',   onMouseDownOrMove, options);
    document.addEventListener('mouseup',     onMouseUpOrMove, options);
    document.addEventListener('touchstart',  onTouchStartOrMove, options);
    document.addEventListener('touchmove',   onTouchStartOrMove, options);
    document.addEventListener('touchend',    onTouchEndOrCancel, options);
    document.addEventListener('touchcancel', onTouchEndOrCancel, options);
}
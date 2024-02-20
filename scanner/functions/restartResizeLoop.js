function restartResizeLoop() {
    resizeInterval = resizeInterval || setInterval(resizablesLoopFunction, RESIZE_POLLING_INTERVAL);
}
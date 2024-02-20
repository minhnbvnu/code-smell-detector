function stopResizeLoop() {
    if (resizeInterval) {
        clearInterval(resizeInterval);
        resizeInterval = undefined;
    }
}
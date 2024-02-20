function stopPaintLoop() {
    if (paintRequest) {
        cancelAnimationFrame(paintRequest);
        paintRequest = undefined;
    }
}
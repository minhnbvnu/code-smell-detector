function restartPaintLoop() {
    paintRequest = paintRequest || requestAnimationFrame(paintLoopFunction);
}
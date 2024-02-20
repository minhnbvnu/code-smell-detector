function setPathForEraser() {
   drawingContext.beginPath();
   drawingContext.moveTo(lastX, lastY);
   drawingContext.arc(lastX, lastY,
                      ERASER_RADIUS + ERASER_LINE_WIDTH,
                      0, Math.PI*2, false);
}
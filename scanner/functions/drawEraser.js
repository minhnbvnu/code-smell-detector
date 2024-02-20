function drawEraser(loc) {
   drawingContext.save();
   setEraserAttributes();     

   drawingContext.beginPath();
   drawingContext.arc(loc.x, loc.y, ERASER_RADIUS,
                      0, Math.PI*2, false);
   drawingContext.clip();
   drawingContext.stroke();

   drawingContext.restore();
}
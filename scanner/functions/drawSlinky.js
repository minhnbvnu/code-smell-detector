function drawSlinky(loc) {
   drawingContext.save();
   setSlinkyAttributes();     

   drawingContext.beginPath();
   drawingContext.arc(loc.x, loc.y, ERASER_RADIUS,
                      0, Math.PI*2, false);
   drawingContext.clip();

   drawingContext.strokeStyle = strokeStyleSelect.value;
   drawingContext.stroke();

   if (doFill) {
      drawingContext.shadowColor = undefined;
      drawingContext.shadowOffsetX = 0;
      drawingContext.globalAlpha = 0.2;
      drawingContext.fill();
   }
   drawingContext.restore();
}
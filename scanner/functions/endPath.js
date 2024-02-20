function endPath(loc) {
   drawingContext.lineTo(loc.x, loc.y);
   drawingContext.stroke();
                 
   if (selectedFunction === 'pathClosed') {
      drawingContext.closePath();

      if (doFill) {
         drawingContext.fill();
      }
      drawingContext.stroke();
   }
}
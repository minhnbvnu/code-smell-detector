function finishDrawingCurve() {
   drawingCanvas.style.cursor = 'crosshair';
   restoreDrawingSurface();
   drawCurve(); 

   if (doFill) {
      drawingContext.fill();
   }
}
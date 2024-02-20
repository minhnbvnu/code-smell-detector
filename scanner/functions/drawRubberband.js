function drawRubberband(loc) {
   drawingContext.save();

   drawingContext.strokeStyle = RUBBERBAND_STROKE_STYLE;
   drawingContext.lineWidth   = RUBBERBAND_LINE_WIDTH;
   
   if (selectedFunction === 'rectangle') {
      drawRubberbandRectangle();
   }
   else if (selectedFunction === 'line' ||
            selectedFunction === 'curve') {
      drawRubberbandLine(loc);
   }
   else if (selectedFunction === 'circle') { 
      drawRubberbandCircle(loc);
   }

   drawingContext.restore();
}
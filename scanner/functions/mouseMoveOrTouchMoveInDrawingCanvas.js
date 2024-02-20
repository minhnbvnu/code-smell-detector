function mouseMoveOrTouchMoveInDrawingCanvas(loc) {
   if (draggingControlPoint) {
      restoreDrawingSurface();

      moveControlPoint(loc);

      drawingContext.save();

      drawingContext.strokeStyle = RUBBERBAND_STROKE_STYLE;
      drawingContext.lineWidth = RUBBERBAND_LINE_WIDTH;

      drawCurve();
      drawControlPoint();

      drawingContext.restore();
   }
   else if (dragging) {
      if (selectedFunction === 'erase') {
         eraseLast();
         drawEraser(loc);
      }
      else if (selectedFunction === 'slinky') {
         drawSlinky(loc);
      }
      else if (selectedFunction === 'path' ||
               selectedFunction === 'pathClosed') {
         drawingContext.lineTo(loc.x, loc.y);
         drawingContext.stroke();
      }
      else { // For lines, circles, rectangles, and curves, draw rubberbands
         restoreDrawingSurface();
         updateRubberbandRectangle(loc);
         drawRubberband(loc);   
      }

      lastX = loc.x;
      lastY = loc.y;
   
      lastRect.w = rubberbandW;
      lastRect.h = rubberbandH;
   }

   if (dragging || draggingControlPoint) {
       if (selectedFunction === 'line' ||
           selectedFunction === 'rectangle' ||
           selectedFunction === 'circle') {
         drawGuidewires(loc.x, loc.y);
      }
   }
}
function mouseUpOrTouchEndInDrawingCanvas(loc) {
   if (selectedFunction !== 'erase' && selectedFunction !== 'slinky') {
      restoreDrawingSurface();
   }

   if (draggingControlPoint) {
      moveControlPoint(loc);
      finishDrawingCurve();
      draggingControlPoint = false;
   }
   else if (dragging) {
      if (selectedFunction === 'erase') { 
         eraseLast(); 
      }
      else if (selectedFunction === 'path' ||
               selectedFunction === 'pathClosed') { 
         endPath(loc);
      }
      else {
         if (selectedFunction === 'line')           finishDrawingLine(loc);
         else if (selectedFunction === 'rectangle') finishDrawingRectangle();
         else if (selectedFunction === 'circle')    finishDrawingCircle(loc);
         else if (selectedFunction === 'curve')     startEditingCurve(loc);
     }
   }
   dragging = false;
}
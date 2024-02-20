function mouseDownOrTouchStartInDrawingCanvas(loc) {
   dragging = true;

   if (editingText) {
      finishDrawingText();
   }
   else if (editingCurve) {
      if (drawingContext.isPointInPath(loc.x, loc.y)) {
         draggingControlPoint = true;
      }
      else {
         restoreDrawingSurface();
      }
      editingCurve = false;
   }

   if (!draggingControlPoint) {
      saveDrawingSurface();
      mousedown.x = loc.x;
      mousedown.y = loc.y;
   
      if (selectedFunction === 'path' || selectedFunction === 'pathClosed') {
         drawingContext.beginPath();
         drawingContext.moveTo(loc.x, loc.y);               
      }
      else if (selectedFunction === 'text') {
         startDrawingText();
      }
      else {
         editingText = false;
      }      

      lastX = loc.x;
      lastY = loc.y;
   }
}
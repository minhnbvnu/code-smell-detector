function mouseDownOrTouchStartInControlCanvas(loc) {
   if (editingText) {
      editingText = false;
      eraseTextCursor();
      hideKeyboard();
   }
   else if (editingCurve) {
      editingCurve = false;
      restoreDrawingSurface();
   }
  
   ICON_RECTANGLES.forEach(function(rect) {
      iconContext.beginPath();

      iconContext.rect(rect.x, rect.y, rect.w, rect.h);
      if (iconContext.isPointInPath(loc.x, loc.y)) {
         selectIcon(rect, loc);
         selectedFunction = getIconFunction(rect, loc);

         if (selectedFunction === 'text') {
            drawingCanvas.style.cursor = 'text';
         }
         else {
            drawingCanvas.style.cursor = 'crosshair';
         }
      }
   });
}
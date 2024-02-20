function startEditingCurve(loc) {
   if (loc.x != mousedown.x || loc.y != mousedown.y) {
      drawingCanvas.style.cursor = 'pointer';

      curveStart.x = mousedown.x;
      curveStart.y = mousedown.y;

      curveEnd.x = loc.x;
      curveEnd.y = loc.y;

      controlPoint.x = (curveStart.x + curveEnd.x)/2;
      controlPoint.y = (curveStart.y + curveEnd.y)/2;

      drawControlPoint();

      editingCurve = true;

      if (showCurveInstructions)
         curveInstructions.style.display = 'inline';
   }
}
function finishDrawingLine(loc) {   
   drawingContext.beginPath();
   drawingContext.moveTo(mousedown.x, mousedown.y);
   drawingContext.lineTo(loc.x, loc.y);
   drawingContext.stroke();
}
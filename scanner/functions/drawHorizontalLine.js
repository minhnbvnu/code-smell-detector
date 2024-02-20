function drawHorizontalLine (y) {
   drawingContext.beginPath();
   drawingContext.moveTo(0, y+0.5);
   drawingContext.lineTo(drawingCanvas.width, y+0.5);
   drawingContext.stroke();
}
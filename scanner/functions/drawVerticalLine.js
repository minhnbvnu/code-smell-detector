function drawVerticalLine (x) {
   drawingContext.beginPath();
   drawingContext.moveTo(x+0.5, 0);
   drawingContext.lineTo(x+0.5, drawingCanvas.height);
   drawingContext.stroke();
}
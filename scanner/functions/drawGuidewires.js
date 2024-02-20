function drawGuidewires(x, y) {
   drawingContext.save();
   drawingContext.strokeStyle = 'rgba(0,0,230,0.4)';
   drawingContext.lineWidth = 0.5;
   drawVerticalLine(x);
   drawHorizontalLine(y);
   drawingContext.restore();
}
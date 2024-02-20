function drawClosedPathIcon(rect) {
   fillIconLowerRight(rect);
   iconContext.beginPath();
   drawOpenPathIconLines(rect);
   iconContext.closePath();
   iconContext.stroke();
}
function drawCurveIcon(rect) {
   fillIconLowerRight(rect);
   iconContext.beginPath();
   iconContext.beginPath();
   iconContext.moveTo(rect.x + rect.w - 10, rect.y + 5);
   iconContext.quadraticCurveTo(rect.x - 10, rect.y,
                                rect.x + rect.w - 10,
                                rect.y + rect.h - 5);
   iconContext.stroke();
}
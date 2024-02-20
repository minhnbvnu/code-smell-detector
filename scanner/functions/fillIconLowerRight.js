function fillIconLowerRight(rect) {
   iconContext.beginPath();
   iconContext.moveTo(rect.x + rect.w, rect.y);
   iconContext.lineTo(rect.x + rect.w, rect.y + rect.h);
   iconContext.lineTo(rect.x, rect.y + rect.h);
   iconContext.closePath();
   iconContext.fill();
}
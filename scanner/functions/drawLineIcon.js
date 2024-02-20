function drawLineIcon(rect) {
   iconContext.beginPath();
   iconContext.moveTo(rect.x + 5, rect.y + 5);
   iconContext.lineTo(rect.x + rect.w - 5, rect.y + rect.h - 5);
   iconContext.stroke();
}
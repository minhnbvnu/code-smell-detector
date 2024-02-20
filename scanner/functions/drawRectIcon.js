function drawRectIcon(rect) {
   fillIconLowerRight(rect);
   iconContext.strokeRect(rect.x + 5, rect.y + 5,
                          rect.w - 10, rect.h - 10); 
}
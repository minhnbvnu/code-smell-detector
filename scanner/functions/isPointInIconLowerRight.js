function isPointInIconLowerRight(rect, x, y) {
   iconContext.beginPath();   
   iconContext.moveTo(rect.x + rect.w, rect.y);
   iconContext.lineTo(rect.x + rect.w, rect.y + rect.h);
   iconContext.lineTo(rect.x, rect.y + rect.h);
            
   return iconContext.isPointInPath(x, y);
}
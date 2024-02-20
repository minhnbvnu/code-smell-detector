function drawSlinkyIcon(rect) {
   var x, y;
   
   fillIconLowerRight(rect);

   iconContext.save();
   iconContext.strokeStyle = 'rgba(100, 140, 230, 0.6)';

   for (var i=-2; i < rect.w/3 + 2; i+=1.5) {
      if (i < rect.w/6) x = rect.x + rect.w/3 + i + rect.w/8;
      else              x = rect.x + rect.w/3 + (rect.w/3 - i) + rect.w/8;

      y = rect.y + rect.w/3 + i;
      
      iconContext.beginPath();
      iconContext.arc(x, y, 12, 0, Math.PI*2, false);
      iconContext.stroke();
   }
   iconContext.restore();
}
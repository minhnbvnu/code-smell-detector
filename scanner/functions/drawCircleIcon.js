function drawCircleIcon(rect) {
   var startAngle = 3*Math.PI/4,
       endAngle = 7*Math.PI/4,
       center = {x: rect.x + rect.w/2, y: rect.y + rect.h/2 };

   fillIconLowerRight(rect);

   iconContext.beginPath();
   iconContext.arc(rect.x + rect.w/2, rect.y + rect.h/2,
                   CIRCLE_ICON_RADIUS, 0, Math.PI*2, false);
   iconContext.stroke();
}
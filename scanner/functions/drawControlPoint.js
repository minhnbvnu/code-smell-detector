function drawControlPoint() {
   drawingContext.save();

   drawingContext.strokeStyle = CONTROL_POINT_STROKE_STYLE;
   drawingContext.fillStyle   = CONTROL_POINT_FILL_STYLE;
   drawingContext.lineWidth   = 1.0;

   drawingContext.beginPath();
   drawingContext.arc(controlPoint.x, controlPoint.y,
                      CONTROL_POINT_RADIUS, 0, Math.PI*2, false);
   drawingContext.stroke(); 
   drawingContext.fill();

   drawingContext.restore();
}
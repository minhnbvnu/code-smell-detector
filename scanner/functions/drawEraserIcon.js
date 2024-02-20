function drawEraserIcon(rect) {
   var rect = ICON_RECTANGLES[ERASER_ICON];
   iconContext.save();

   iconContext.beginPath();
   iconContext.arc(rect.x + rect.w/2,
                   rect.y + rect.h/2,
                   ERASER_ICON_RADIUS, 0, Math.PI*2, false);

   iconContext.strokeStyle = ERASER_ICON_CIRCLE_COLOR;
   iconContext.stroke();

   iconContext.clip(); // restrict drawGrid() to the circle

   drawGrid(iconContext, ERASER_ICON_GRID_COLOR, 5, 5);

   iconContext.restore();
}
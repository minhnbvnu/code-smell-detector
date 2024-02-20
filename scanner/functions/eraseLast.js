function eraseLast() {
   var x = lastX - ERASER_RADIUS-ERASER_LINE_WIDTH,
       y = lastY - ERASER_RADIUS-ERASER_LINE_WIDTH,
       w = ERASER_RADIUS*2+ERASER_LINE_WIDTH*2,
       h = w,
       cw = drawingContext.canvas.width,
       ch = drawingContext.canvas.height;

   drawingContext.save();

   setPathForEraser();
   drawingContext.clip();

      if (x + w > cw) w = cw - x;
      if (y + h > ch) h = ch - y;

      if (x < 0) { x = 0; }
      if (y < 0) { y = 0; }

      drawingContext.drawImage(
         backgroundContext.canvas, x, y, w, h, x, y, w, h);

   drawingContext.restore();
}
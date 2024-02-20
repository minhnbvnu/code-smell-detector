function drawIcon(rect) {
   iconContext.save();

   iconContext.strokeStyle = ICON_BORDER_STROKE_STYLE;
   iconContext.strokeRect(rect.x, rect.y, rect.w, rect.h);
   iconContext.strokeStyle = ICON_STROKE_STYLE;
   
   if (rect.y === ICON_RECTANGLES[LINE_ICON].y)             drawLineIcon(rect);
   else if (rect.y === ICON_RECTANGLES[RECTANGLE_ICON].y)   drawRectIcon(rect);
   else if (rect.y === ICON_RECTANGLES[CIRCLE_ICON].y)      drawCircleIcon(rect);
   else if (rect.y === ICON_RECTANGLES[OPEN_PATH_ICON].y)   drawOpenPathIcon(rect);
   else if (rect.y === ICON_RECTANGLES[CLOSED_PATH_ICON].y) drawClosedPathIcon(rect, 20);
   else if (rect.y === ICON_RECTANGLES[TEXT_ICON].y)        drawTextIcon(rect);
   else if (rect.y === ICON_RECTANGLES[CURVE_ICON].y)       drawCurveIcon(rect);
   else if (rect.y === ICON_RECTANGLES[ERASER_ICON].y)      drawEraserIcon(rect);
   else if (rect.y === ICON_RECTANGLES[SLINKY_ICON].y)      drawSlinkyIcon(rect);

   iconContext.restore();
}
function getIconFunction(rect, loc) {
   var action;

   if (rect.y === ICON_RECTANGLES[LINE_ICON].y)             action = 'line';
   else if (rect.y === ICON_RECTANGLES[RECTANGLE_ICON].y)   action = 'rectangle';
   else if (rect.y === ICON_RECTANGLES[CIRCLE_ICON].y)      action = 'circle';
   else if (rect.y === ICON_RECTANGLES[OPEN_PATH_ICON].y)   action = 'path';
   else if (rect.y === ICON_RECTANGLES[CLOSED_PATH_ICON].y) action = 'pathClosed';
   else if (rect.y === ICON_RECTANGLES[CURVE_ICON].y)       action = 'curve';
   else if (rect.y === ICON_RECTANGLES[TEXT_ICON].y)        action = 'text';
   else if (rect.y === ICON_RECTANGLES[SLINKY_ICON].y)      action = 'slinky';
   else if (rect.y === ICON_RECTANGLES[ERASER_ICON].y)      action = 'erase';

   if (action === 'rectangle'  || action === 'circle' ||
       action === 'pathClosed' || action === 'text'   ||
       action === 'curve'      || action === 'slinky') {
      doFill = isPointInIconLowerRight(rect, loc.x, loc.y);
   }

   return action;
}
function drawTextIcon(rect) {
   var text = TEXT_ICON_TEXT;
   
   fillIconLowerRight(rect);
   iconContext.fillStyle = TEXT_ICON_FILL_STYLE;
   iconContext.fillText(text, rect.x + rect.w/2,
                              rect.y + rect.h/2 + 5);
   iconContext.strokeText(text, rect.x + rect.w/2,
                                rect.y + rect.h/2 + 5);
}
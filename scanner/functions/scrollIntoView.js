function scrollIntoView(cm, x1, y1, x2, y2) {
  var scrollPos = calculateScrollPos(cm, x1, y1, x2, y2);
  if (scrollPos.scrollTop != null) { setScrollTop(cm, scrollPos.scrollTop); }
  if (scrollPos.scrollLeft != null) { setScrollLeft(cm, scrollPos.scrollLeft); }
}
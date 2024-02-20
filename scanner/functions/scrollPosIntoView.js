function scrollPosIntoView(cm, pos, end, margin) {
  if (margin == null) { margin = 0; }
  var coords;
  for (var limit = 0; limit < 5; limit++) {
    var changed = false;
    coords = cursorCoords(cm, pos);
    var endCoords = !end || end == pos ? coords : cursorCoords(cm, end);
    var scrollPos = calculateScrollPos(cm, Math.min(coords.left, endCoords.left),
                                       Math.min(coords.top, endCoords.top) - margin,
                                       Math.max(coords.left, endCoords.left),
                                       Math.max(coords.bottom, endCoords.bottom) + margin);
    var startTop = cm.doc.scrollTop, startLeft = cm.doc.scrollLeft;
    if (scrollPos.scrollTop != null) {
      setScrollTop(cm, scrollPos.scrollTop);
      if (Math.abs(cm.doc.scrollTop - startTop) > 1) { changed = true; }
    }
    if (scrollPos.scrollLeft != null) {
      setScrollLeft(cm, scrollPos.scrollLeft);
      if (Math.abs(cm.doc.scrollLeft - startLeft) > 1) { changed = true; }
    }
    if (!changed) { break }
  }
  return coords
}
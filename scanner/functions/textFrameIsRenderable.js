function textFrameIsRenderable(frame, artboardRect) {
  var good = true;
  if (!testBoundsIntersection(frame.visibleBounds, artboardRect)) {
    good = false;
  } else if (frame.kind != TextType.AREATEXT && frame.kind != TextType.POINTTEXT) {
    good = false;
  } else if (objectIsHidden(frame)) {
    good = false;
  } else if (frame.contents === '') {
    good = false;
  }
  return good;
}
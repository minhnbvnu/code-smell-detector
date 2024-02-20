function getSpecialLayerText(lyr, ab) {
  var text = '';
  forEach(lyr.textFrames, eachFrame);
  function eachFrame(frame) {
    if (testBoundsIntersection(frame.visibleBounds, ab.artboardRect)) {
      text = frame.contents;
    }
  }
  return text;
}
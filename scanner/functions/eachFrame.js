function eachFrame(frame) {
    if (testBoundsIntersection(frame.visibleBounds, ab.artboardRect)) {
      text = frame.contents;
    }
  }
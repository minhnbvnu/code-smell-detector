function _getTouchTarget(e) {
    if (_supportTouch) {
      const clientX = e.targetTouches[0].clientX;
      const clientY = e.targetTouches[0].clientY;
      return document.elementFromPoint(clientX, clientY);
    }
    return e.target;
  }
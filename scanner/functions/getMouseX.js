function getMouseX(event) {
    if ('clientX' in event) return event.clientX;
    return event.targetTouches[0] && event.targetTouches[0].clientX || 0;
  }
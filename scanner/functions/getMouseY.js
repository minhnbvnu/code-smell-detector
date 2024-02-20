function getMouseY(event) {
    if ('clientY' in event) return event.clientY;
    return event.targetTouches[0] && event.targetTouches[0].clientY || 0;
  }
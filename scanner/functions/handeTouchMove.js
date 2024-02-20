function handeTouchMove(e) {
    if (!_isDragging) return;
    if (_dragContext.resizable !== true) {
      _handeTouchMove(e);
    } else {
      _handeTouchResize(e);
    }
  }
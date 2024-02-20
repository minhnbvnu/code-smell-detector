function preventGrabbed (e) {
    if (_grabbed) {
      e.preventDefault();
    }
  }
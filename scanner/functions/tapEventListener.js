function tapEventListener(type, enable, useCapture) {
  if (enable !== false) {
    tapDoc.addEventListener(type, tapEventListeners[type], useCapture);
  } else {
    tapDoc.removeEventListener(type, tapEventListeners[type]);
  }
}
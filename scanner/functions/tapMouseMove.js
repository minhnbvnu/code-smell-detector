function tapMouseMove(e) {
  if (tapHasPointerMoved(e)) {
    tapEventListener('mousemove', false);
    ionic.activator.end();
    tapPointerMoved = true;
    return false;
  }
}
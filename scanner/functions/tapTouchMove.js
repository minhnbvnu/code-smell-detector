function tapTouchMove(e) {
  if (tapHasPointerMoved(e)) {
    tapPointerMoved = true;
    tapEventListener(tapTouchMoveListener, false);
    ionic.activator.end();
    return false;
  }
}
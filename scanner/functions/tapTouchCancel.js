function tapTouchCancel() {
  tapEventListener(tapTouchMoveListener, false);
  ionic.activator.end();
  tapPointerMoved = false;
}
function pointerDownHandler(evt) {
  // touchstart should be treated like a left mouse button
  let button = evt.button != null ? pointerMap[evt.button] : 'left';
  pressedButtons[button] = true;
  pointerHandler(evt, 'onDown');
}
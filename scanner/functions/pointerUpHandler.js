function pointerUpHandler(evt) {
  let button = evt.button != null ? pointerMap[evt.button] : 'left';
  pressedButtons[button] = false;
  pointerHandler(evt, 'onUp');
}
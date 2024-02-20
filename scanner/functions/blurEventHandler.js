function blurEventHandler(evt) {
  let pointer = pointers.get(evt.target);
  pointer._oo = null;
  pressedButtons = {};
}
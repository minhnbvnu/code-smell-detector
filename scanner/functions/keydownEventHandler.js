function keydownEventHandler(evt) {
  let key = keyMap[evt.code];
  let callback = keydownCallbacks[key];
  pressedKeys[key] = true;
  call(callback, evt);
}
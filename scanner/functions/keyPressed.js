function keyPressed(keys) {
  return !![].concat(keys).some(key => pressedKeys[key]);
}
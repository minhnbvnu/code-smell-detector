function initInput(options = {}) {
  initKeys();
  let pointer = initPointer(options.pointer);
  initGesture();
  initGamepad();

  return { pointer };
}
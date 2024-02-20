function offGesture(gestures) {
  [].concat(gestures).map(gesture => {
    callbacks[gesture] = 0;
  });
}
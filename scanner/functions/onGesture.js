function onGesture(gestures, callback) {
  [].concat(gestures).map(gesture => {
    callbacks[gesture] = callback;
  });
}
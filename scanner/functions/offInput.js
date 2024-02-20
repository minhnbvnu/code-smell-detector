function offInput(inputs, { gamepad, key } = {}) {
  [].concat(inputs).map(input => {
    if (contains(input, gamepadMap)) {
      offGamepad(input, gamepad);
    } else if (isGesture(input)) {
      offGesture(input);
    } else if (contains(input, keyMap)) {
      offKey(input, key);
    } else if (['down', 'up'].includes(input)) {
      offPointer(input);
    }
  });
}
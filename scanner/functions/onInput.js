function onInput(inputs, callback, { gamepad, key } = {}) {
  [].concat(inputs).map(input => {
    if (contains(input, gamepadMap)) {
      onGamepad(input, callback, gamepad);
    } else if (isGesture(input)) {
      onGesture(input, callback);
    } else if (contains(input, keyMap)) {
      onKey(input, callback, key);
    } else if (['down', 'up'].includes(input)) {
      onPointer(input, callback);
    }
    // @ifdef DEBUG
    else {
      throw new TypeError(`"${input}" is not a valid input name`);
    }
    // @endif
  });
}
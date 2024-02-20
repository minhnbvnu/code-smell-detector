function onGamepad(
  buttons,
  callback,
  { gamepad, handler = 'gamepaddown' } = {}
) {
  let callbacks =
    handler == 'gamepaddown'
      ? gamepaddownCallbacks
      : gamepadupCallbacks;

  // smaller than doing `Array.isArray(buttons) ? buttons : [buttons]`
  [].concat(buttons).map(button => {
    if (isNaN(gamepad)) {
      callbacks[button] = callback;
    } else {
      callbacks[gamepad] = callbacks[gamepad] || {};
      callbacks[gamepad][button] = callback;
    }
  });
}
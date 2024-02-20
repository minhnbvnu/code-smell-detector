function offGamepad(
  buttons,
  { gamepad, handler = 'gamepaddown' } = {}
) {
  let callbacks =
    handler == 'gamepaddown'
      ? gamepaddownCallbacks
      : gamepadupCallbacks;

  // smaller than doing `Array.isArray(buttons) ? buttons : [buttons]`
  [].concat(buttons).map(button => {
    if (isNaN(gamepad)) {
      delete callbacks[button];
    } else {
      callbacks[gamepad] = callbacks[gamepad] || {};
      delete callbacks[gamepad][button];
    }
  });
}
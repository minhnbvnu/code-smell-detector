function gamepadPressed(button, { gamepad } = {}) {
  if (isNaN(gamepad)) {
    return gamepads.some(pad => pad.pressedButtons[button]);
  }
  // this won't exist until the gamepad has been connected
  if (gamepads[gamepad]) {
    return !!gamepads[gamepad].pressedButtons[button];
  }

  return false;
}
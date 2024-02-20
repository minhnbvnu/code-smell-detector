function gamepadConnectedHandler(event) {
  gamepads[event.gamepad.index] = {
    pressedButtons: {},
    axes: {}
  };
}
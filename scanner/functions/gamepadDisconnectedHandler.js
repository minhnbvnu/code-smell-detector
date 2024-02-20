function gamepadDisconnectedHandler(event) {
  delete gamepads[event.gamepad.index];
}
function initGamepad() {
  window.addEventListener(
    'gamepadconnected',
    gamepadConnectedHandler
  );
  window.addEventListener(
    'gamepaddisconnected',
    gamepadDisconnectedHandler
  );
  window.addEventListener('blur', blurEventHandler);

  // update gamepad state each frame
  on('tick', updateGamepad);
}
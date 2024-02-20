function simulateGamepadEvent(type, gamepad) {
  let evt = new GamepadEvent(type);

  // evt.gamepad is read-only so we need to override it
  Object.defineProperty(evt, 'gamepad', {
    value: {
      buttons: [],
      axes: [],
      ...gamepad
    }
  });

  window.dispatchEvent(evt);

  return evt;
}
function createGamepad(index = getGamepadsStub.length) {
  let gamepadObj = {
    index,
    connected: true,
    buttons: [],
    axes: [0, 0, 0, 0]
  };
  for (let i = 0; i < 16; i++) {
    gamepadObj.buttons[i] = { pressed: false };
  }

  simulateGamepadEvent('gamepadconnected', gamepadObj);
  getGamepadsStub[index] = gamepadObj;
}
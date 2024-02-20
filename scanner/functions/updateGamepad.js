function updateGamepad() {
  // in Chrome this a GamepadList but in Firefox it's an array
  let pads = navigator.getGamepads
    ? navigator.getGamepads()
    : navigator.webkitGetGamepads
    ? navigator.webkitGetGamepads
    : [];

  for (let i = 0; i < pads.length; i++) {
    let gamepad = pads[i];

    // a GamepadList will have a default length of 4 but use null for
    // any index that doesn't have a gamepad connected
    if (!gamepad) {
      continue;
    }

    gamepad.buttons.map((button, index) => {
      let buttonName = gamepadMap[index];
      let { pressed } = button;
      let { pressedButtons } = gamepads[gamepad.index];
      let state = pressedButtons[buttonName];

      // if the button was not pressed before and is now pressed
      // that's a gamepaddown event
      if (!state && pressed) {
        [
          gamepaddownCallbacks[gamepad.index],
          gamepaddownCallbacks
        ].map(callback => {
          callback?.[buttonName]?.(gamepad, button, buttonName);
        });
      }
      // if the button was pressed before and is now not pressed
      // that's a gamepadup event
      else if (state && !pressed) {
        [gamepadupCallbacks[gamepad.index], gamepadupCallbacks].map(
          callback => {
            callback?.[buttonName]?.(gamepad, button, buttonName);
          }
        );
      }

      pressedButtons[buttonName] = pressed;
    });

    let { axes } = gamepads[gamepad.index];
    axes.leftstickx = gamepad.axes[0];
    axes.leftsticky = gamepad.axes[1];
    axes.rightstickx = gamepad.axes[2];
    axes.rightsticky = gamepad.axes[3];
  }
}
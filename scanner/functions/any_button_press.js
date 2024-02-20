function any_button_press(gamepad) {
    if (gamepad === undefined) {
        return any_button_press(gamepad_array[0]) || any_button_press(gamepad_array[1]) || any_button_press(gamepad_array[2]) || any_button_press(gamepad_array[3]) || touch.aa;
    } else {
        return gamepad.aa || gamepad.bb || gamepad.cc || gamepad.dd || gamepad.ee || gamepad.ff || gamepad.qq;
    }
}
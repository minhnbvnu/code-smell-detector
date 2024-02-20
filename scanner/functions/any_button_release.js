function any_button_release(gamepad) {
    if (gamepad === undefined) {
        return any_button_release(gamepad_array[0]) || any_button_release(gamepad_array[1]) || any_button_release(gamepad_array[2]) || any_button_release(gamepad_array[3]) || touch.released_a;
    } else {
        return gamepad.released_a || gamepad.released_b || gamepad.released_c || gamepad.released_d || gamepad.released_e || gamepad.released_f || gamepad.released_q;
    }
}
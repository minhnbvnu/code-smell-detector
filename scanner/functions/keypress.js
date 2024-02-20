function keypress(input, key) {
    input.trigger($.Event("keypress", { keyCode: KEY_TO_KEYCODE_MAP[key] } ));
}
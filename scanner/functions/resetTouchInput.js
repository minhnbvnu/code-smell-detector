function resetTouchInput() {
    if (mouse.movement_x !== undefined) {
        mouse.movement_x = mouse.movement_y = 0;
    }
    QRuntime.touch.pressed_a = QRuntime.touch.released_a = QRuntime.touch.aa = 0;
}
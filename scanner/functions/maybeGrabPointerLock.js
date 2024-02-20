function maybeGrabPointerLock() {
    if (usePointerLock) {
        emulatorScreen.requestPointerLock();
    }
    emulatorScreen.style.cursor = runtime_cursor;
    overlayScreen.style.cursor = runtime_cursor;
    afterglowScreen.style.cursor = runtime_cursor;
}
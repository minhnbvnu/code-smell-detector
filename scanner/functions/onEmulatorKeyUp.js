function onEmulatorKeyUp(event) {
    const key = event.code;
    emulatorKeyState[key] = false;
    emulatorKeyJustReleased[key] = true;
    event.stopPropagation();
    event.preventDefault();
}
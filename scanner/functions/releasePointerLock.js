function releasePointerLock() {
    document.exitPointerLock();
    emulatorScreen.style.cursor = 'crosshair';
    overlayScreen.style.cursor = 'crosshair';
    afterglowScreen.style.cursor = 'crosshair';
}
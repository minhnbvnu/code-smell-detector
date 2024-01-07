function isMousePointerLocked() {
    return !!(document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement);
}
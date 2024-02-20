function keyDownCapturer(to) {
    hotkeyTo = to;
    document.addEventListener('keydown', KeyDownTrigger, false);
}
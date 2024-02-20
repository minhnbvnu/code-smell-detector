function requestFullScreen() {
    // Full-screen the UI. This can fail if not triggered by a user interaction.
    try { 
        const body = document.getElementsByTagName('body')[0];
        if (body.requestFullscreen) {
            body.requestFullscreen().catch(function(){});
        } else if (body.webkitRequestFullscreen) {
            body.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (body.mozRequestFullScreen) {
            body.mozRequestFullScreen();
        } else if (body.msRequestFullscreen) {
            body.msRequestFullscreen();
        }
    } catch (e) {}

    try {
        // Capture the escape key (https://web.dev/keyboard-lock/)
        window.top.navigator.keyboard.lock();
    } catch (e) {}
}
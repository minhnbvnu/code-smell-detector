function onMouseDownOrMove(event) {
    updateMouseDevice(event);
    // Allow mouse movement to prevent sleep, but not to wake
    updateLastInteractionTime();
    
    if (event.buttons !== 0) {
        // Do not wake on mouse movement, only buttons
        wake();

        // Synthesize a fake touch event (which will then get turned
        // into a fake key event!)
        fakeMouseEvent.changedTouches[0].clientX = event.clientX;
        fakeMouseEvent.changedTouches[0].clientY = event.clientY;
        fakeMouseEvent.realEvent = event;
        fakeMouseEvent.target = event.target;
        return onTouchStartOrMove(fakeMouseEvent);
    }
}
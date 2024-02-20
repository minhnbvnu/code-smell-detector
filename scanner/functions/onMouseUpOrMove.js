function onMouseUpOrMove(event) {
    updateMouseDevice(event);
    // Synthesize a fake touch event (which will then get turned
    // into a fake key event!)
    fakeMouseEvent.changedTouches[0].clientX = event.clientX;
    fakeMouseEvent.changedTouches[0].clientY = event.clientY;
    fakeMouseEvent.realEvent = event;
    fakeMouseEvent.target = event.target;
    return onTouchEndOrCancel(fakeMouseEvent);
}
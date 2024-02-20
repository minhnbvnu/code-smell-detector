function onTouchesChanged(event) {
    // Do not process buttons when they aren't visible
    if (uiMode !== 'Emulator') { return; }
    
    // Latch state
    for (let j = 0; j < emulatorButtonArray.length; ++j) {
        const button = emulatorButtonArray[j];
        button.wasPressed = button.currentlyPressed || false;
        button.currentlyPressed = false;
    }
    
    // Processes all touches to see what is currently pressed
    for (let t in activeTouchTracker) {
        const touch = activeTouchTracker[t];
        let touchPressed = true;

        // Test against dead zone
        for (let j = 0; j < deadZoneArray.length; ++j) {
            if (inElement(touch, deadZoneArray[j])) {
                touchPressed = false;
                break;
            }
        }

        // Process all buttons
        for (let j = 0; j < emulatorButtonArray.length; ++j) {
            const button = emulatorButtonArray[j];
            button.currentlyPressed = button.currentlyPressed ||
                (inElement(touch, button) && touchPressed);
        }
    }

    // Now see which buttons differ from their previous state
    for (let j = 0; j < emulatorButtonArray.length; ++j) {
        const button = emulatorButtonArray[j];
        if (button.wasPressed !== button.currentlyPressed) {
            // This button's state changed
            const buttonCode = button.id.substring(0, button.id.length - 'button'.length);

            // Fake a keyboard event
            const fakeEvent = {code: buttonCode, stopPropagation:Math.abs, preventDefault:Math.abs}
            
            if (button.currentlyPressed) {
                onEmulatorKeyDown(fakeEvent);
                emulatorButtonState[buttonCode] = 1;
            } else {
                onEmulatorKeyUp(fakeEvent);
                emulatorButtonState[buttonCode] = 0;
            }
        }
    }

    // See if this event was in any of the buttons (including on and
    // end event, where it will not be in the touch list) and then
    // prevent/stop that event so that we don't get a synthetic mouse event
    // or scroll.
    for (let i = 0; i < event.changedTouches.length; ++i) {
        let touch = event.changedTouches[i];
        for (let j = 0; j < emulatorButtonArray.length; ++j) {
            if (inElement(touch, emulatorButtonArray[j])) {
                event.preventDefault();
                event.stopPropagation();
                break;
            }
        }
    }
}
function onTouchStartOrMove(event) {
    wake();
    updateLastInteractionTime();
    for (let i = 0; i < event.changedTouches.length; ++i) {
        const touch = event.changedTouches[i];
        let tracker = activeTouchTracker[touch.identifier];

        const screen_coord = emulatorScreenEventCoordToQuadplayScreenCoord(touch);
        if (event.target === emulatorScreen || event.target === overlayScreen || event.target === afterglowScreen) {

            if (! tracker ||
                !(tracker.lastTarget === emulatorScreen || tracker.lastTarget === overlayScreen || tracker.lastTarget === afterglowScreen)) {
                // New touch
                QRuntime.touch.aa = (! QRuntime.touch.a) ? 1 : 0;
                QRuntime.touch.pressed_a = QRuntime.touch.aa;
                QRuntime.touch.a = 1;
                QRuntime.touch.screen_dx = 0;
                QRuntime.touch.screen_dy = 0;
            } else {
                // Continued touch
                QRuntime.touch.screen_dx = screen_coord.x - QRuntime.touch.screen_x;
                QRuntime.touch.screen_dy = screen_coord.y - QRuntime.touch.screen_y;
            }
            
            QRuntime.touch.screen_x = screen_coord.x;
            QRuntime.touch.screen_y = screen_coord.y;
            
            if (QRuntime.touch.aa && document.getElementById('printTouchEnabled').checked) {
                $systemPrint(`\ntouch.screen_xy = xy(${QRuntime.touch.screen_x}, ${QRuntime.touch.screen_y})`);

                // Read the 32-bit color from the screen
                const C = updateImageData32[Math.floor(QRuntime.touch.screen_y) * SCREEN_WIDTH + Math.floor(QRuntime.touch.screen_x)];
                const r = (C >> 4) & 0xf, g = (C >> 12) & 0xf, b = (C >> 20) & 0xf;
                const hex_color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`.toUpperCase();
                $outputAppend(`<i>rgb(${Math.round(100 * r / 15)}%, ${Math.round(100 * g / 15)}%, ${Math.round(100 * b / 15)}%) <div style="width: 32px; height: 12px; display: inline-block; position: relative; top: 2px; background: ${hex_color}"></div> ${hex_color}</i><br>`);
            }
        }

        if (tracker &&
            (tracker.lastTarget === emulatorScreen || tracker.lastTarget === overlayScreen || tracker.lastTarget === afterglowScreen) &&
            (event.target !== emulatorScreen && event.target !== overlayScreen && event.target !== afterglowScreen)) {
            // Lost contact with screen
            QRuntime.touch.a = 0;
            QRuntime.touch.released_a = 1;
        }

        if (! tracker) {
            tracker = activeTouchTracker[touch.identifier] = {identifier: touch.identifier, screen_coord: {x:0, y:0}};
        }

        if (event.target === emulatorScreen || event.target === overlayScreen || event.target === afterglowScreen) {
            tracker.screen_x = screen_coord.x;
            tracker.screen_y = screen_coord.y;
        }

        tracker.clientX = touch.clientX;
        tracker.clientY = touch.clientY;
        tracker.lastTarget = event.target;
    }

    onTouchesChanged(event);

    if ((event.target === emulatorScreen || event.target === overlayScreen) || (event.target.className === 'emulatorButton')) {
        // Prevent default browser handling on virtual controller buttons
        event.preventDefault();
        event.stopPropagation();
        event.cancelBubble = true;
    }

    return false;
}
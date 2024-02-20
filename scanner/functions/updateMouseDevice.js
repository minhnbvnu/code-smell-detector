function updateMouseDevice(event) {
    if (event.target === emulatorScreen || event.target === overlayScreen) {
        const coord = emulatorScreenEventCoordToQuadplayScreenCoord(event);
        mouse.screen_x = coord.x;
        mouse.screen_y = coord.y;

        if (event.movementX !== undefined) {
            const rect = emulatorScreen.getBoundingClientRect();

            let zoom = 1;
            if (isSafari) {
                zoom = parseFloat(document.getElementById('screenBorder').style.zoom || '1');
            }

            if (mouse.movement_x === undefined) {
                mouse.movement_x = mouse.movement_y = 0;
            }

            // Movement events are available on this browser. They are higher precision and
            // survive pointer lock, so report them instead. These must be ACCUMULATED because
            // they arrive at the monitor's refresh rate, not the game's refresh rate. On
            // high framerate monitors we need to know the total of all mouse events. These
            // are zeroed again in the main game loop.            
            mouse.movement_x += emulatorScreen.width  * event.movementX / (rect.width  * zoom);
            mouse.movement_y += emulatorScreen.height * event.movementY / (rect.height * zoom);
            mouse.movement = true;
        }
    }
    mouse.buttons = event.buttons;
}
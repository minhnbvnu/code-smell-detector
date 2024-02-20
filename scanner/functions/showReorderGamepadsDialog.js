function showReorderGamepadsDialog() {
    const dialog = document.getElementById('reorderGamepadsDialog');
    dialog.classList.remove('hidden');

    // Store the state on this function

    // Start with a mapping that is useless, so that we can use indexOf on
    // real indices to see if they have been consumed.
    showReorderGamepadsDialog.map = [9, 9, 9, 9];

    // Gamepad we are currently testing for
    showReorderGamepadsDialog.index = 0;

    // Set the initial message
    showReorderGamepadsDialog.assign(undefined);

    const poll = function() {
        const gamepads = navigator.getGamepads();

        if (gamepads) {
            let g = -1;
            for (let i = 0; i < gamepads.length; ++i) {
                const gamepad = gamepads[i];

                // Chrome may have null gamepads in the list
                if (! gamepad) { continue; } else { ++g; }

                // Ignore buttons on gamepads that have been assigned already
                if (showReorderGamepadsDialog.map.indexOf(g) === -1) {
                    for (let b = 0; b < gamepad.buttons.length; ++b) {
                        if (gamepad.buttons[b].pressed) {
                            // A button is pressed on this gamepad. Assign it and advance
                            // to the next one.
                            showReorderGamepadsDialog.assign(g);
                            break;
                        }
                    } // for b
                } // if
            } // for i/g
        } // if gamepads exist

        if (showReorderGamepadsDialog.index > 3) {
            // Done!
            onReorderGamepadsDone();
        } else if (! dialog.classList.contains('hidden')) {
            // Poll repeatedly until the dialog closes
            setTimeout(poll, 15);
        }
    };
    
    poll();
}
function updateInput() {
    mouse.screen_x_prev = mouse.screen_x;
    mouse.screen_y_prev = mouse.screen_y;

    // Update touch frame count (after the first frame)
    if (QRuntime.touch.a && ! QRuntime.touch.aa) {
        ++QRuntime.touch.a;
    }
    
    const axes = 'xy', AXES = 'XY', buttons = 'abcdefpq';

    // HTML gamepad indices of corresponding elements of the buttons array
    // A, B, C, D, E, F, _P, Q
    const buttonIndex = [0, 1, 2, 3, 4, 5, 9, 8];
    
    // Aliases on console game controller
    const altButtonIndex = [undefined, undefined, undefined, undefined, 6, 7, undefined, undefined];

    // Also processes input
    const gamepadArray = getIdealGamepads();

    const keyMap = keyMapTable[keyboardMappingMode];
    
    // Sample the keys
    let anyInteraction = false;
    for (let player = 0; player < 4; ++player) {
        const reordered_player = gamepadOrderMap[player];
        const map = keyMap[player], pad = QRuntime.gamepad_array[player],
              realGamepad = gamepadArray[reordered_player], prevRealGamepad = prevRealGamepadState[reordered_player];

        // Network player
        if (pad.$status === 'guest') {
            const latest = pad.$guest_latest_state;
            if (! latest) { return; }

            // Digital axes
            for (let i = 0; i < axes.length; ++i) {
                const axis = axes[i];
                const oldv = pad['$' + axis];
                const newv  = latest['$' + axis];
                
                pad['$d' + axis] = newv - oldv;
                pad['$' + axis + axis] = (newv !== oldv) ? newv : 0;
                pad['$' + axis] = newv;
            }

            // Analog axes
            for (let a = 0; a < pad.$analog.length; ++a) {
                pad.$analog[a] = latest.$analog[a];
            }

            // Buttons
            for (let b = 0; b < buttons.length; ++b) {
                const button = buttons[b];
                const prefix = button === 'p' ? '$' : '';
                const BUT = prefix + button;
                
                const oldv = pad[prefix + button];
                const newv = latest[prefix + button];

                pad[prefix + button + button] = pad[prefix + 'pressed_' + button] = (newv >= 0.5) && (oldv < 0.5) ? 1 : 0;
                pad[prefix + 'released_' + button] = (newv < 0.5) && (oldv >= 0.5) ? oldv : 0;
                pad[prefix + button] = newv ? oldv + 1 : 0;
            }

            pad.$id = latest.$id;
            if (latest.type !== pad.type) {
                pad.type = latest.type;
                pad.prompt = Object.freeze(Object.assign({'##' : '' + (player + 1)}, controlSchemeTable[pad.type]));
            }
            
            continue;
        }
        
        // Have player 0 physical alt controls set player 1 virtual buttons only
        // if there is no second controller physically present
	const altRealGamepad = ((player === 1) && ! realGamepad) ? gamepadArray[gamepadOrderMap[0]] : undefined,
	      altPrevRealGamepad = ((player === 1) && ! realGamepad) ? prevRealGamepadState[gamepadOrderMap[0]] : undefined;

        if (realGamepad && (realGamepad.id !== pad.$id)) {
            // The gamepad just connected or changed. Update the control scheme.
            pad.$id = realGamepad.id;
            pad.type = detectControllerType(realGamepad.id);
            pad.prompt = Object.freeze(Object.assign({'##' : '' + (player + 1)}, controlSchemeTable[pad.type]));
        } else if (! realGamepad && (pad.$id !== '') && (pad.$id !== 'mobile')) {
            // Gamepad was just disconnected. Update the control scheme.
            pad.$id = isMobile ? 'mobile' : '';
            pad.type = defaultControlType(player);
            pad.prompt = Object.freeze(Object.assign({'##' : '' + (player + 1)}, controlSchemeTable[pad.type]));
        }

        // Analog controls
        for (let a = 0; a < 4; ++a) {
            pad.$analog[a] = realGamepad ? realGamepad.analogAxes[a] : 0;
        }
        
        // Axes
        for (let a = 0; a < axes.length; ++a) {
            const axis = axes[a];
            const pos = '+' + axis, neg = '-' + axis;
            const old = pad['$' + axis];

            if (map) {
                // Keyboard controls
                const n0 = map[neg][0], n1 = map[neg][1], p0 = map[pos][0], p1 = map[pos][1];

                // Current state
                pad['$' + axis] = (((emulatorKeyState[n0] || emulatorKeyState[n1]) ? -1 : 0) +
                                   ((emulatorKeyState[p0] || emulatorKeyState[p1]) ? +1 : 0));

                // Just pressed
                pad['$' + axis + axis] = (((emulatorKeyJustPressed[n0] || emulatorKeyJustPressed[n1]) ? -1 : 0) +
                                          ((emulatorKeyJustPressed[p0] || emulatorKeyJustPressed[p1]) ? +1 : 0));
            } else {
                // Nothing currently pressed
                pad['$' + axis] = pad['$' + axis + axis] = 0;
            }

            if (realGamepad) {
                pad['$' + axis] = pad['$' + axis] || realGamepad.axes[a];
            }

            if (realGamepad && (prevRealGamepad.axes[a] !== realGamepad.axes[a])) {
                pad['$' + axis + axis] = pad['$' + axis + axis] || realGamepad.axes[a];
            }

            if (gameSource.json.dual_dpad && (player === 1) && gamepadArray[gamepadOrderMap[0]]) {
                const otherPad = gamepadArray[gamepadOrderMap[0]];
                // Alias controller[0] right stick (axes 2 + 3)
                // to controller[1] d-pad (axes 0 + 1) for "dual stick" controls                
                if (otherPad.axes[a + 2] !== 0) {
                    pad['$' + axis] = pad['$' + axis] || otherPad.axes[a + 2];
                }
                if (otherPad.axes[a + 2] !== otherPad.axes[a + 2]) {
                    pad['$' + axis + axis] = pad['$' + axis + axis] || otherPad.axes[a + 2];
                }
            } // dual-stick

            // Derivative
            pad['$d' + axis] = pad['$' + axis] - old;
            const axisChange = (pad['$d' + axis] !== 0);
            anyInteraction = anyInteraction || axisChange;
            if (axisChange && pad.$status === 'absent') {
                pad.$status = 'present';
            }

        } // axes
        
        for (let b = 0; b < buttons.length; ++b) {
            const button = buttons[b];
            const prefix = button === 'p' ? '$' : '';
            
            const oldv = pad[prefix + button];
            
            if (map) {
                // Keyboard (only P1's P button has three codes)
                const b0 = map[button][0], b1 = map[button][1], b2 = map[button][2];
                pad[prefix + button] = (emulatorKeyState[b0] || emulatorKeyState[b1] || emulatorKeyState[b2]) ? oldv + 1 : 0;
                pad[prefix + button + button] = pad[prefix + 'pressed_' + button] = (emulatorKeyJustPressed[b0] || emulatorKeyJustPressed[b1] || emulatorKeyJustPressed[b2]) ? 1 : 0;
                pad[prefix + 'released_' + button] = (emulatorKeyJustReleased[b0] || emulatorKeyJustReleased[b1] || emulatorKeyJustReleased[b2]) ? oldv : 0;
            } else {
                pad[prefix + button] = pad[prefix + button + button] = pad[prefix + 'released_' + button] = pad[prefix + 'pressed_' + button] = 0;
            }

            const i = buttonIndex[b], j = altButtonIndex[b];
            const isPressed  = realGamepad && (realGamepad.buttons[i] || realGamepad.buttons[j]);
	    
            const wasPressed = prevRealGamepad && (prevRealGamepad.buttons[i] || prevRealGamepad.buttons[j]);
	    
            if (isPressed) { pad[prefix + button] = oldv + 1; }
	    
            if (isPressed && ! wasPressed) {
                pad[prefix + button + button] = 1;
                pad[prefix + 'pressed_' + button] = 1;
            }

            if (! isPressed && wasPressed) {
                pad[prefix + 'released_' + button] = oldv;
            }

            const buttonChange = (pad[prefix + button] !== 0);
            anyInteraction = anyInteraction || buttonChange;
            if (buttonChange && pad.$status === 'absent') {
                pad.$status = 'present';
            }
        }
    }

    // Update angles for all players (local and remote)
    for (let player = 0; player < 4; ++player) {
        const pad = QRuntime.gamepad_array[player];
        const oldAngle = pad.$angle;
        if ((pad.$y !== 0) || (pad.$x !== 0)) {
            pad.$angle = Math.atan2(-pad.$y, pad.$x);
        }

        if ((pad.$y === pad.$dy && pad.$x === pad.$dx) || (pad.$y === 0 && pad.$x === 0)) {
            pad.$dangle = 0;
        } else {
            // JavaScript operator % is a floating-point operation
            pad.$dangle = ((3 * Math.PI + pad.$angle - oldAngle) % (2 * Math.PI)) - Math.PI;
        }
    }
    
    // Update previous state. This has to be done AFTER the above loop
    // so that any alternative state for player 2 are not immediately
    // overriden during player 1's processing. These do not need to be
    // remapped because they are a straight copy.
    for (let i = 0; i < 4; ++i) {
        if (gamepadArray[i]) {
            prevRealGamepadState[i] = gamepadArray[i];
        }
    }

    if (anyInteraction) { updateLastInteractionTime(); }

    // Reset the just-pressed state
    emulatorKeyJustPressed = {};
    emulatorKeyJustReleased = {};
}
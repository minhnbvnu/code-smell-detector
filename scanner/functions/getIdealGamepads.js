function getIdealGamepads() {
    const gamepads = getGamepads();
    const gamepadArray = [];
    // Center of gamepad
    const deadZone = 0.35;
    
    // Compact gamepads array and perform thresholding
    for (let i = 0; i < gamepads.length; ++i) {
        const pad = gamepads[i];
        if (pad && pad.connected) {
            // Construct a simplified web gamepad API
            const mypad = {axes: [0, 0, 0, 0], buttons: [], analogAxes: [0, 0, 0, 0], id: pad.id};

	    const axisRemap = gamepadAxisRemap[pad.id] || gamepadAxisRemap.identity;
            
            for (let a = 0; a < Math.min(4, pad.axes.length); ++a) {
                const axis = pad.axes[axisRemap[a]];
                mypad.axes[a] = (Math.abs(axis) > deadZone) ? Math.sign(axis) : 0;
                mypad.analogAxes[a] = axis;
            }
            
            // Process all 17 buttons as digital buttons first, even if they are analog
	    const buttonRemap = gamepadButtonRemap[pad.id] || gamepadButtonRemap.identity;
            for (let b = 0; b < 17; ++b) {
                const button = pad.buttons[buttonRemap[b]];
                // Different browsers follow different APIs for the value of buttons
                mypad.buttons[b] = (typeof button === 'object') ? button.pressed : (button >= 0.5);
            }

            // On Steam Deck, the D-pad maps to axes 6 and 7 instead of buttons.
            // But do not override the left stick!
            if (pad.id === '28de-11ff-Microsoft X-Box 360 pad 0') {
                if (pad.axes[6] !== 0) {
                    mypad.axes[0] = pad.axes[6];
                    if (pad.axes[6] > 0) {
                        mypad.buttons[15] = true;
                    } else {
                        mypad.buttons[14] = true;
                    }
                }

                if (pad.axes[7] !== 0) {
                    mypad.axes[1] = pad.axes[7];
                    if (pad.axes[7] > 0) {
                        mypad.buttons[13] = true;
                    } else {
                        mypad.buttons[12] = true;
                    }
                }
                
            } else { // Not steam deck

                // D-pad is buttons U = 12, D = 13, L = 14, R = 15.
                // Use it to override the axes right here.
                if (mypad.buttons[15]) {
                    mypad.axes[0] = +1;
                } else if (mypad.buttons[14]) {
                    mypad.axes[0] = -1;
                }
                
                if (mypad.buttons[12]) {
                    mypad.axes[1] = -1;
                } else if (mypad.buttons[13]) {
                    mypad.axes[1] = +1;
                }
            }

            gamepadArray.push(mypad);
            
            if (gamepadArray.length > prevRealGamepadState.length) {
                prevRealGamepadState.push({axes:[0, 0, 0, 0], 
                    buttons:[false, false, false, false, // 0-3: ABXY buttons
                             false, false, false, false, // 4-7: LB,RB,LT,RT
                             false, false, // 8 & 9: start + select
                             false, false, // 10 & 11: LS, RS
                             false, false, false, false // 12-15: D-pad
                             ]});
            }
        }
    }

    return gamepadArray;
}
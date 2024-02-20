function sleepPollCallback() {
    if (emulatorMode !== 'play') {
        // Still paused
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
        for (let i = 0; i < gamepads.length; ++i) {
            const gamepad = gamepads[i];
            if (! gamepad || ! gamepad.connected) { continue; }
            for (let b = 0; b < gamepad.buttons.length; ++b) {
                const button = gamepad.buttons[b];
                if (((typeof button === 'object') && button.pressed) ||
                    (button >= 0.5)) {
                    wake();
                    return;
                } // button pressed
            } // for each button
        } // for each gamepad

        // Continue polling
        sleep.pollHandler = setTimeout(sleepPollCallback, SLEEP_POLL_INTERVAL_MILLISECONDS);
    } else {
        sleep.pollHandler = undefined;
    }
}
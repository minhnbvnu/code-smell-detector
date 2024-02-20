function sampleInput() {
        if (! isGuesting) {
            console.log('guest terminating sampleInput() interval');
            clearInterval(inputInterval);
            inputInterval = null;
            return;
        }

        // Sample input so that controllers are live
        // to send to the host
        updateInput();

        // Send absolute controls to the host
        if (dataConnection) {
            // Clone, stripping accessors. Note that
            // $name, index, and player_color fields
            // must be set on the host, and accessors
            // are not useful
            const gamepad = window.QRuntime.gamepad_array[0];
            for (let i = 0; i < GAMEPAD_PROPERTY_ARRAY.length; ++i) {
                const P = GAMEPAD_PROPERTY_ARRAY[i];
                inputObject[P] = gamepad[P];
            }

            dataConnection.send({type: 'INPUT', gamepad_array: [inputObject]});
        }
    }
function onMIDIInitSuccess(midiAccess) {
    console.log('MIDI: Initialize success');

    function makeChannel() {
        const channel = {
            $note_active: false,
            $controller_active: false,
            note: new Array(128),
            controller: new Array(128)
        };
        
        for (let i = 0; i < 128; ++i) {
            channel.note[i] = Object.seal({on: 0, pressed: 0, released: 0, velocity: 0, pressure: 0});
            channel.controller[i] = Object.seal({value: 0, delta: 0});
        }

        Object.seal(channel.note);
        Object.seal(channel.controller);
        
        return channel;
    }
    
    function addPort(port) {
        const visible_port = {
            $name: `midi.${port.type === 'input' ? 'in' : 'out'}put_port_table["${port.name + port.id}"]`,
            $port: port,
            name: port.name,
            id: port.id,
            state: port.state,
            manufacturer: port.manufacturer,
            type: port.type,
            ...(port.type === 'input' ? makeChannel() : {})
        };
        
        if (port.type === 'input') {
            if (midi.input_port_table[port.name + port.id]) {
                // Already present
                console.log('MIDI Warning: ignored repeated add of MIDI ' + port.type + ' port ' + port.name);
                return;
            }

            visible_port.channel = new Array(16);
            for (let i = 0; i < 16; ++i) {
                visible_port.channel[i] = makeChannel();
            }
            //Object.seal(visible_port.channel);
            //Object.seal(visible_port);
            midi.input_port_table[port.name + port.id] = visible_port;
            midi.input_port_array.push(visible_port);

            // This triggers a statechange event on MIDIAccess.
            // Sometimes the message handler is already present
            // on a reconnection
            console.log('Adding midimessage handler');
            //console.assert(! port.onmidimessage);
            port.onmidimessage = onMIDIMessage;

        } else {
            if (midi.output_port_table[port.name + port.id]) {
                // Already present
                console.log('Warning: ignored repeated add of MIDI ' + port.type + ' port ' + port.name);
                return;
            }
            
            midi.output_port_table[port.name + port.id] = visible_port;
            midi.output_port_array.push(visible_port);
        }

        console.log('MIDI: Add ' + port.type + ' port ' + port.name);
    }

    // Reset the MIDI object
    midiReset();
    
    midi.$options.midiAccess = midiAccess;
    midi.$options.sysex = midiAccess.sysexEnabled;
   
    for (const port of midiAccess.inputs.values()) {
        // Adding this message triggers a statechange event that
        // causes the input port connection event, so we do not
        // explicitly call addPort() here for inputs.
        addPort(port);
    }

    for (const port of midiAccess.outputs.values()) {
        addPort(port);
    }

    midiAccess.onstatechange = function (event) {
        const port = event.port;

        // Need to delay, otherwise we might miss all of the disconnections that
        // happen this frame.
        setTimeout(updateMidiControllerIcons);
        
        if (port.state === 'connected') {
            // Connect
            addPort(port);
        } else {
            // Disconnect
            console.log('MIDI: Disconnected ' + port.type + ' port ' + port.name);

            if (port.type === 'input') {
                midi.input_port_table[port.name + port.id].state = port.state;
                delete midi.input_port_table[port.name + port.id];
                midi.input_port_array.splice(midi.input_port_array.indexOf(port), 1);
            } else if (port.type === 'output') {
                midi.output_port_table[port.name + port.id].state = port.state;
                delete midi.output_port_table[port.name + port.id];
                midi.output_port_array.splice(midi.output_port_array.indexOf(port), 1);
            }
        }
    };

    // After the event handlers run, sort input ports so that on
    // Novation Launchpad, the MIDI version of the input port comes
    // before the DAW one, since the MIDI one is probably what the
    // programmer wants.
    setTimeout(function () {
        function midiSort(a, b) {
            const am = (a.name.indexOf('MIDI') !== -1) && (a.name.indexOf('DAW') === -1) && (a.name.indexOf('Live') === -1) ? 1 : 0;
            const bm = (b.name.indexOf('MIDI') !== -1) && (b.name.indexOf('DAW') === -1) && (a.name.indexOf('Live') === -1) ? 1 : 0;
            return bm - am;
        }
        midi.input_port_array.sort(midiSort);
        midi.output_port_array.sort(midiSort);
    }, 150);

    if (emulatorMode !== 'stop') {
        // The game was already running when midi access came
        // through. This probably means that it was blocked on a user
        // dialog, and that the game started with the midi object in a
        // bad state. Restart the game.

        // In kiosk mode, this causes the virtual GPU to fail
        // to render, so as a temporary workaround we are not
        // running it in that mode.
        if (getQueryString('kiosk') !== '1') {
            onRestartButton();
        }
    }
}
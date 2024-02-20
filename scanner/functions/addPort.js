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
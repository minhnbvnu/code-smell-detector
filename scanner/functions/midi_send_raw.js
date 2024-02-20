function midi_send_raw(port, message) {
    if (! port && port.$port) {
        $error('Not a MIDI output port');
    }

    if (!Array.isArray(message)) {
        $error('The message must be an array of 8-bit integers');
    }

    if (port.$port.state !== 'connected') {
        return 'MIDI port no longer connected';
    }

    if (port.$port.connection !== 'open') {
        // Open the port
        port.$port.open().then(function () {
            midi_send_raw(port, message);
        });
    } else {
        try {
            port.$port.send(message);
        } catch (e) {
            return e.message;
        }
    }
    
    return 'ok';
}
function midiBeforeFrame() {
    // Increment every note that was held down and reset deltas for
    // controllers for channels that have received active input
    // previously.
    for (const name in midi.input_port_table) {
        const port = midi.input_port_table[name];

        // The port acts as an aggregate channel
        midiInputChannelBeforeFrame(port);

        for (let c = 0; c < 16; ++c) {
            midiInputChannelBeforeFrame(port.channel[c]);
        }
    }

    for (const message of midi.message_queue) {
        const port = message.port;
        midiProcessInputMessage(port, message);

        if (message.channel !== undefined) {
            midiProcessInputMessage(port.channel[message.channel], message);
        }
    } // for each message
}
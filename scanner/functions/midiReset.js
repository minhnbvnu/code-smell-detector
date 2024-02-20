function midiReset() {
    if (midi.$options.midiAccess) { midi.$options.midiAccess.onstatechange = undefined; }

    // Remove event handlers
    for (const port of midi.input_port_array) {
        port.$port.onmidimessage = undefined;
    }
    
    midi.message_queue.length = 0;
    midi.input_port_array.length = 0;
    midi.output_port_array.length = 0;
    Object.keys(midi.input_port_table).forEach(key => delete midi.input_port_table[key]);
    Object.keys(midi.output_port_table).forEach(key => delete midi.output_port_table[key]);
}
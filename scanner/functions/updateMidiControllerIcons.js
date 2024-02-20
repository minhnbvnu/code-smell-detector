function updateMidiControllerIcons() {
    {
        const element = document.getElementById('midiIcon0');
        const N = midi.input_port_array.length;
        if (N > 0) {
            element.className = 'midiPresent';
            element.title = midi.input_port_array[0].name +
                (N > 1 ? '\nand ' + (N - 1) + ' other MIDI input devices' : '') +
                '\n\nClick for details';
        } else {
            element.className = 'midiAbsent';
            element.title = 'Connect a USB MIDI input device';
        }
    }
    {
        const element = document.getElementById('midiIcon1');
        const N = midi.output_port_array.length;
        if (N > 0) {
            element.className = 'midiPresent';
            element.title = midi.output_port_array[0].name +
                (N > 1 ? '\nand ' + (N - 1) + ' other MIDI output devices' : '') +
                '\n\nClick for details';
        } else {
            element.className = 'midiAbsent';
            element.title = 'Connect a USB MIDI output device';
        }
    }
}
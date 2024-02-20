function msg_int(step) {
    // For each instrument...
    for (instrument_index in sequencer.instruments) {
        var instrument = sequencer.instruments[instrument_index];

        // For each note...
        for (note_index in instrument) {
            var note = instrument[note_index];

            if (note["pos"] == step) {
                var midi_pitch = ROOT_MIDI_PITCH +
                    instrument_index * PITCHES_PER_INSTRUMENT +
                    (PITCHES_PER_INSTRUMENT - 1) - note["pitch"];

                // play note!
                outlet(0, midi_pitch);
            }
        }
    }
}
function loadBinaryFile(e) {

            // Parse as MIDI
            // 
            var midiFile = MidiFile(e.target.result);

            // If it looks like MIDI, proceed.
            // TODO: better way to test for this?
            // 
            if (midiFile.tracks.length) {
                var notes = parseMidiFile(midiFile);
                sendNoteEvents(notes);
            }
        }
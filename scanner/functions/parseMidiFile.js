function parseMidiFile(midiFile) {
            var midiTime = 0;
            var notes = [];

            // For each MIDI event in first track
            // 
            $.each(midiFile.tracks[0], function(index, midiEvent) {
                midiTime += midiEvent.deltaTime;

                // Check for noteOns
                // 
                if (midiEvent.subtype == "noteOn") {
                    notes.push({
                        midiTime: midiTime,
                        midiPitch: midiEvent.noteNumber
                    });
                }
            });

            return notes;
        }
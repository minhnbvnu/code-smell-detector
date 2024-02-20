function sendNoteEvents(notes) {

            // clear all existing notes
            // 
            player.clearAllNotes();

            if (notes.length > OrchestraConfiguration.MAX_NUMBER_OF_NOTES) {
                console.log("WARNING: MIDI file contains more than " + OrchestraConfiguration.MAX_NUMBER_OF_NOTES + " notes");
            }

            for (note_index in notes) {
                // only include notes within MAX
                if (note_index < OrchestraConfiguration.MAX_NUMBER_OF_NOTES) {
                    player.getLiveManager().getPlayerDisplay().externalAddUserNote(
                        notes[note_index].midiTime / MIDI_TICKS_PER_BEAT, (OrchestraConfiguration.NUMBER_OF_PITCHES - 1) - (notes[note_index].midiPitch - ROOT_MIDI_NOTE));
                }
            }
        }
function noteOn(note, velocity) {
            if (generatorsByNote[note] && !generatorsByNote[note].released) {
                /* playing same note before releasing the last one. BOO */
                generatorsByNote[note].noteOff(); /* TODO: check whether we ought to be passing a velocity in */
            }
            generator = currentProgram.createNote(note, velocity);
            synth.addGenerator(generator);
            generatorsByNote[note] = generator;
        }
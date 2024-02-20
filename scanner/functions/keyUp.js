function keyUp(evt)
        {
            let note = getNote(evt.key);

            if (note)
            {
                let noteNo = music.Note(note).shift(this.octaveNo).noteNo;
                this.noteOn(noteNo, 0);
            }
        }
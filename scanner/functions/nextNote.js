function nextNote(curNote)
    {
        for (;;)
        {
            var note = rnd.elem(notes);

            var cons = music.consonance(curNote, note);

            if (cons < 0)
                continue;

            return note;
        }
    }
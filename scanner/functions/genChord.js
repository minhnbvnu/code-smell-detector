function genChord(rootNote, type)
{
    if ((rootNote instanceof Note) === false)
        rootNote = new Note(rootNote);

    // Get the intervals for this type of chord
    var intervs = chordIntervs[type];

    assert (
        intervs instanceof Array,
        'invalid chord type: ' + type
    );

    // Get the root note number
    var rootNo = rootNote.noteNo;

    // Compute the note numbers for the notes
    var notes = intervs.map(function (i) { return new Note(rootNo + i); });

    return notes;
}
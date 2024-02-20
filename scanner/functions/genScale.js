function genScale(rootNote, scale, numOctaves)
{
    if ((rootNote instanceof Note) === false)
        rootNote = new Note(rootNote);

    if (numOctaves === undefined)
        numOctaves = 1;

    // Get the intervals for this type of chord
    var intervs = scaleIntervs[scale];

    assert (
        intervs instanceof Array,
        'invalid scale name: ' + scale
    );

    // List of generated notes
    var notes = [];

    // For each octave
    for (var octNo = 0; octNo < numOctaves; ++octNo)
    {
        var octRoot = rootNote.shift(octNo);

        // Add the root note to the scale
        notes.push(octRoot);

        // Add the scale notes
        for (var i = 0; i < intervs.length; ++i)
        {
            var prevNote = notes[notes.length-1];

            var interv = intervs[i];

            notes.push(prevNote.offset(interv));
        }
    }

    // Add the note closing the last octave
    notes.push(rootNote.shift(numOctaves));

    return notes;
}
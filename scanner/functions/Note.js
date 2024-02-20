function Note(val)
{
    // If we got a note name, convert it to a note number
    if (typeof val === 'string')
        val = Note.nameToNo(val);

    assert (
        typeof val === 'number',
        'invalid note number'
    );

    if (Note.notesByNo[val] !== undefined)
        return Note.notesByNo[val];

    // Create a note object
    var note = Object.create(Note.prototype);
    note.noteNo = val;

    // Store the note object in the note table
    Note.notesByNo[val] = note;

    return note;
}
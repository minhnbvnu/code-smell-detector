function setCurrentNotes()
{
    var notes = getCurrentNotesText();
    $('#notesInfo').text(notes);
    return notes;
}
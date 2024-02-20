function getCurrentNotes()
{
    var notes = currentSlide.find("div.notes-section."+section);
    return notes;
}
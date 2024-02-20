function toggleNoteEditor(show_editor) {
    if (show_editor) {
        $('#currentNoteContent').show();
        $('#emptyNoteDisplay').hide();
    } else {
        $('#currentNoteContent').hide();
        $('#emptyNoteDisplay').show();
    }
}
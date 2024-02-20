function proxy_comment_element() {
    let note_id = $('#currentNoteIDLabel').data('note_id');

    return comment_element(note_id, 'notes');
}
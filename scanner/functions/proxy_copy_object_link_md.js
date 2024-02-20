function proxy_copy_object_link_md() {
    let note_id = $('#currentNoteIDLabel').data('note_id');

    return copy_object_link_md('note', note_id);
}
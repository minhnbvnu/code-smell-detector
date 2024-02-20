async function get_remote_note(note_id) {
    return get_request_api("/case/notes/" + note_id);
}
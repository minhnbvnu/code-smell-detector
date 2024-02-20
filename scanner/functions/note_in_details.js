function note_in_details(note_id, case_id) {
    window.open("/case/notes?cid=" + case_id + "&shared=" + note_id);

}
function move_note_api(note_id, new_directory_id) {
    let data = Object();
    data['csrf_token'] = $('#csrf_token').val();
    data['directory_id'] = new_directory_id;

    return post_request_api(`/case/notes/update/${note_id}`,
        JSON.stringify(data));
}
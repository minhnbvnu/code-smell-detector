function add_note(directory_id) {
    let data = Object();
    data['directory_id'] = directory_id;
    data['note_title'] = 'New note';
    data['note_content'] = '';
    data['csrf_token'] = $('#csrf_token').val();

    post_request_api('/case/notes/add', JSON.stringify(data))
    .done((data) => {
        if (notify_auto_api(data, true)) {
            note_detail(data.data.note_id);
            load_directories().then(function() {
                $('.note').removeClass('note-highlight');
                $('#note-' + data.data.note_id).addClass('note-highlight');
            });
        }
    });
}
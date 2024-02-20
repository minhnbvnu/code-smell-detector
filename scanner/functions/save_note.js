function save_note() {
    clear_api_error();
    let n_id = $('#currentNoteIDLabel').data('note_id')


    let data_sent = Object();
    let currentNoteTitle = $('#currentNoteTitle').text() ? $('#currentNoteTitle').text() : $('#currentNoteTitleInput').val();
    data_sent['note_title'] = currentNoteTitle;
    data_sent['csrf_token'] = $('#csrf_token').val();
    data_sent['note_content'] = $('#note_content').val();
    let ret = get_custom_attributes_fields();
    let has_error = ret[0].length > 0;
    let attributes = ret[1];

    if (has_error){return false;}

    data_sent['custom_attributes'] = attributes;

    post_request_api('/case/notes/update/'+ n_id, JSON.stringify(data_sent), false, undefined, cid, function() {
        $('#btn_save_note').text("Error saving!").removeClass('btn-success').addClass('btn-danger').removeClass('btn-danger');
        $('#last_saved > i').attr('class', "fa-solid fa-file-circle-xmark");
        $('#last_saved').addClass('btn-danger').removeClass('btn-success');
    })
    .done((data) => {
        if (data.status == 'success') {
            $('#btn_save_note').text("Saved").addClass('btn-success').removeClass('btn-danger').removeClass('btn-warning');
            $('#last_saved').removeClass('btn-danger').addClass('btn-success');
             $("#content_last_saved_by").text('Last saved by you');
            $('#last_saved > i').attr('class', "fa-solid fa-file-circle-check");
            collaborator.save(n_id);
            if (previousNoteTitle !== currentNoteTitle) {
                load_directories().then(function() {
                    $('.note').removeClass('note-highlight');
                    $('#note-' + n_id).addClass('note-highlight');
                });
                previousNoteTitle = currentNoteTitle;
            }
        }
    });
}
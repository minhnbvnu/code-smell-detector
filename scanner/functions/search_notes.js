function search_notes() {
    var data = Object();
    data['search_term'] = $("#search_note_input").val();
    data['csrf_token'] = $("#csrf_token").val();

    post_request_api('/case/notes/search', JSON.stringify(data))
    .done((data) => {
        if (data.status == 'success') {
            $('#notes_search_list').empty();
            for (e in data.data) {
                let lit_tag = $('<li>');
                lit_tag.addClass('list-group-item list-group-item-action note');
                lit_tag.attr('id', 'note-' + data.data[e]['note_id']);
                lit_tag.attr('onclick', 'note_detail(' + data.data[e]['note_id'] + ');');
                lit_tag.text(data.data[e]['note_title']);
                $('#notes_search_list').append(lit_tag);

            }
            $('#notes_search_list').show();

        } else {
            if (data.message != "No data to load for dashboard") {
                swal("Oh no !", data.message, "error");
            }
        }
    })
}
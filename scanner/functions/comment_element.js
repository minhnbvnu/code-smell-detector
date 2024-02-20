function comment_element(element_id, element_type, is_alert=false) {

    const prefix = is_alert ? '/alerts' : `/case/${element_type}`;
    const url = `${prefix}/${element_id}/comments/modal`;
    $('#modal_comment_content').load(url + case_param(),
        function (response, status, xhr) {
            if (status !== "success") {
                 ajax_notify_error(xhr, url);
                 return false;
            }

            $('#modal_comment_content').resizable({
                minHeight: 300,
                minWidth: 300,
                handles: "n, e, s, w, ne, se, sw, nw"
            });
            $('.modal-comment').draggable({
                cursor: 'move'
            });

            $('#modal_comment').modal('show');

            g_comment_desc_editor = get_new_ace_editor('comment_message', 'comment_content', 'target_comment_content',
                        function() {
                            $('#last_saved').addClass('btn-danger').removeClass('btn-success');
                            $('#last_saved > i').attr('class', "fa-solid fa-file-circle-exclamation");
                        }, null, false, false);

            headers = get_editor_headers('g_comment_desc_editor', null, 'comment_edition_btn');
            $('#comment_edition_btn').append(headers);

            load_comments(element_id, element_type, undefined, undefined, is_alert);
        }
    );
}
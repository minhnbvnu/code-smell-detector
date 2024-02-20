function save_edit_comment(element_id, element_type) {
    data = Object();
    data['comment_text'] = g_comment_desc_editor.getValue();
    comment_id = $('.comment_editing').data('comment_id');
    data['csrf_token'] = $('#csrf_token').val();

    const is_alert = element_type === 'alerts';
    const prefix = is_alert ? '/alerts' : `/case/${element_type}`;
    post_request_api(`${prefix}/${element_id}/comments/${comment_id}/edit`, JSON.stringify(data), true)
    .done((data) => {
        if(notify_auto_api(data)) {
            cancel_edition(comment_id);
            load_comments(element_id, element_type, comment_id, undefined, is_alert);
        }
    });
}
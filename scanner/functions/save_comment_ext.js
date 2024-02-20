function save_comment_ext(element_id, element_type, do_close){
    data = Object();
    data['comment_text'] = g_comment_desc_editor.getValue();
    data['csrf_token'] = $('#csrf_token').val();
    const is_alert = element_type === 'alerts';
    const prefix = is_alert ? '/alerts' : `/case/${element_type}`;

    post_request_api(`${prefix}/${element_id}/comments/add`, JSON.stringify(data), true)
    .done((data) => {
        if(notify_auto_api(data)) {
            load_comments(element_id, element_type, undefined, undefined, is_alert);
            g_comment_desc_editor.setValue('');
            increase_modal_comments_count(element_type, element_id);
        }
    });
}
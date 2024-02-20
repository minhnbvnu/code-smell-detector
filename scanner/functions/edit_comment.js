function edit_comment(comment_id, element_id, element_type) {
    const is_alert = element_type === 'alerts';
    const prefix = is_alert ? '/alerts' : `/case/${element_type}`;
    get_request_api(`${prefix}/${element_id}/comments/${comment_id}`)
    .done((data) => {
        if(notify_auto_api(data, true)) {

            $('#comment_'+comment_id).addClass('comment_editing');
            $('#comment_'+comment_id).data('comment_id', comment_id);
            g_comment_desc_editor.setValue(data.data.comment_text);
            $('#comment_edition').show();
            $('#comment_submit').hide();
            $('#cancel_edition').show();

        }
    });

}
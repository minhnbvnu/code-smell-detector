function preview_comment() {
    if(!$('#container_comment_preview').is(':visible')) {
        let comment_text = g_comment_desc_editor.getValue();
        let converter = get_showdown_convert();
        let html = converter.makeHtml(comment_text);
        let comment_html = do_md_filter_xss(html);
        $('#target_comment_content').html(comment_html);
        $('#container_comment_preview').show();
        $('#comment_preview_button').html('<i class="fa-solid fa-eye-slash"></i> Edit');
        $('#container_comment_content').hide();
    }
    else {
        $('#container_comment_preview').hide();
        $('#comment_preview_button').html('<i class="fa-solid fa-eye"></i> Preview');
        $('#container_comment_content').show();
    }
}
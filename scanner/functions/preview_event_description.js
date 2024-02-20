function preview_event_description(no_btn_update) {
    if(!$('#container_event_description').is(':visible')) {
        event_desc = g_event_desc_editor.getValue();
        converter = get_showdown_convert();
        html = converter.makeHtml(do_md_filter_xss(event_desc));
        event_desc_html = do_md_filter_xss(html);
        $('#target_event_desc').html(event_desc_html);
        $('#container_event_description').show();
        if (!no_btn_update) {
            $('#event_preview_button').html('<i class="fa-solid fa-eye-slash"></i>');
        }
        $('#container_event_desc_content').hide();
    }
    else {
        $('#container_event_description').hide();
         if (!no_btn_update) {
            $('#event_preview_button').html('<i class="fa-solid fa-eye"></i>');
        }

        $('#event_preview_button').html('<i class="fa-solid fa-eye"></i>');
        $('#container_event_desc_content').show();
    }
}
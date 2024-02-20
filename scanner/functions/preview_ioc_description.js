function preview_ioc_description(no_btn_update) {
    if(!$('#container_ioc_description').is(':visible')) {
        ioc_desc = g_ioc_desc_editor.getValue();
        converter = get_showdown_convert();
        html = converter.makeHtml(do_md_filter_xss(ioc_desc));
        ioc_desc_html = do_md_filter_xss(html);
        $('#target_ioc_desc').html(ioc_desc_html);
        $('#container_ioc_description').show();
        if (!no_btn_update) {
            $('#ioc_preview_button').html('<i class="fa-solid fa-eye-slash"></i>');
        }
        $('#container_ioc_desc_content').hide();
    }
    else {
        $('#container_ioc_description').hide();
         if (!no_btn_update) {
            $('#ioc_preview_button').html('<i class="fa-solid fa-eye"></i>');
        }

        $('#ioc_preview_button').html('<i class="fa-solid fa-eye"></i>');
        $('#container_ioc_desc_content').show();
    }
}
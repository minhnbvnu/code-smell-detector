function preview_task_description(no_btn_update) {
    if(!$('#container_task_description').is(':visible')) {
        task_desc = g_task_desc_editor.getValue();
        converter = get_showdown_convert();
        html = converter.makeHtml(do_md_filter_xss(task_desc));
        task_desc_html = do_md_filter_xss(html);
        $('#target_task_desc').html(task_desc_html);
        $('#container_task_description').show();
        if (!no_btn_update) {
            $('#task_preview_button').html('<i class="fa-solid fa-eye-slash"></i>');
        }
        $('#container_task_desc_content').hide();
    }
    else {
        $('#container_task_description').hide();
         if (!no_btn_update) {
            $('#task_preview_button').html('<i class="fa-solid fa-eye"></i>');
        }

        $('#task_preview_button').html('<i class="fa-solid fa-eye"></i>');
        $('#container_task_desc_content').show();
    }
}
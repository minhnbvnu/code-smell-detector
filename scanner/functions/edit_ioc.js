function edit_ioc(ioc_id) {
    url = 'ioc/' + ioc_id + '/modal' + case_param();
    $('#modal_add_ioc_content').load(url, function (response, status, xhr) {
        hide_minimized_modal_box();
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }
        
        g_ioc_id = ioc_id;
        g_ioc_desc_editor = get_new_ace_editor('ioc_description', 'ioc_desc_content', 'target_ioc_desc',
                            function() {
                                $('#last_saved').addClass('btn-danger').removeClass('btn-success');
                                $('#last_saved > i').attr('class', "fa-solid fa-file-circle-exclamation");
                            }, null, false, false);

        g_ioc_desc_editor.setOption("minLines", "10");
        preview_ioc_description(true);
        headers = get_editor_headers('g_ioc_desc_editor', null, 'ioc_edition_btn');
        $('#ioc_edition_btn').append(headers);

        load_menu_mod_options_modal(ioc_id, 'ioc', $("#ioc_modal_quick_actions"));
        $('.dtr-modal').hide();
        $('#modal_add_ioc').modal({ show: true });
        edit_in_ioc_desc();
    });

}
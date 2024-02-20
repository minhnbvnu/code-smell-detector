function asset_details(asset_id) {

    url = 'assets/' + asset_id + '/modal' + case_param();
    $('#modal_add_asset_content').load(url, function (response, status, xhr) {
        hide_minimized_modal_box();
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }
        g_asset_id = asset_id;
        g_asset_desc_editor = get_new_ace_editor('asset_description', 'asset_desc_content', 'target_asset_desc',
                            function() {
                                $('#last_saved').addClass('btn-danger').removeClass('btn-success');
                                $('#last_saved > i').attr('class', "fa-solid fa-file-circle-exclamation");
                            }, null, false, false);

        g_asset_desc_editor.setOption("minLines", "10");
        preview_asset_description(true);
        headers = get_editor_headers('g_asset_desc_editor', null, 'asset_edition_btn');

        $('#asset_edition_btn').append(headers);

        $('#ioc_links').select2({});


        $('#submit_new_asset').on("click", function () {
            update_asset(true);
            return false;
        })

        load_menu_mod_options_modal(asset_id, 'asset', $("#asset_modal_quick_actions"));
        $('.dtr-modal').hide();

        $('#modal_add_asset').modal({ show: true });
        edit_in_asset_desc();
    });


    return false;
}
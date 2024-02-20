function preview_asset_description(no_btn_update) {
    if(!$('#container_asset_description').is(':visible')) {
        asset_desc = g_asset_desc_editor.getValue();
        converter = get_showdown_convert();
        html = converter.makeHtml(do_md_filter_xss(asset_desc));
        asset_desc_html = do_md_filter_xss(html);
        $('#target_asset_desc').html(asset_desc_html);
        $('#container_asset_description').show();
        if (!no_btn_update) {
            $('#asset_preview_button').html('<i class="fa-solid fa-eye-slash"></i>');
        }
        $('#container_asset_desc_content').hide();
    }
    else {
        $('#container_asset_description').hide();
         if (!no_btn_update) {
            $('#asset_preview_button').html('<i class="fa-solid fa-eye"></i>');
        }

        $('#asset_preview_button').html('<i class="fa-solid fa-eye"></i>');
        $('#container_asset_desc_content').show();
    }
}
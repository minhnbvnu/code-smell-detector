function edit_in_asset_desc() {

    if($('#container_asset_desc_content').is(':visible')) {
        $('#container_asset_description').show(100);
        $('#container_asset_desc_content').hide(100);
        $('#asset_edition_btn').hide(100);
        $('#asset_preview_button').hide(100);
    } else {
        $('#asset_preview_button').show(100);
        $('#asset_edition_btn').show(100);
        $('#container_asset_desc_content').show(100);
        $('#container_asset_description').hide(100);
    }
}
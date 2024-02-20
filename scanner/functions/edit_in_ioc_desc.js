function edit_in_ioc_desc() {
    if($('#container_ioc_desc_content').is(':visible')) {
        $('#container_ioc_description').show(100);
        $('#container_ioc_desc_content').hide(100);
        $('#ioc_edition_btn').hide(100);
        $('#ioc_preview_button').hide(100);
    } else {
        $('#ioc_preview_button').show(100);
        $('#ioc_edition_btn').show(100);
        $('#container_ioc_desc_content').show(100);
        $('#container_ioc_description').hide(100);
    }
}
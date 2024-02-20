function reset_ds_file_view() {
    $(".node-selected").removeClass("node-selected");
    $(".file-selected").removeClass("file-selected");
    $('.ds-file-selector').hide();
    $('#msg_select_destination_folder').attr("data-file-id", '');
    $('#msg_select_destination_folder').hide();
    $('#msg_select_destination_folder_folder').hide();
    $('.ds-file-selector').hide();
    $('.btn-ds-bulk').hide();
    $('.btn-ds-bulk-selector').removeClass('active');
}
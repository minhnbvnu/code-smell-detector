function move_ds_file(file_id) {

    reparse_activate_tree_selection();
    $('.ds-file-selector').show();
    $('#msg_mv_dst_folder').text('unselected destination');
    $('#msg_select_destination_folder').show();

    ds_file_select(file_id);
}
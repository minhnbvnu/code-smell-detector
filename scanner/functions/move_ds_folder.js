function move_ds_folder(node_id) {
     reset_ds_file_view();

    $('#msg_mv_folder').text($('#' + node_id).text());
    $('#msg_mv_dst_folder_folder').text('unselected destination');
    $('#msg_select_destination_folder_folder').show();

    reparse_activate_tree_selection();
    $('#' + node_id).addClass('node-source-selected');
}
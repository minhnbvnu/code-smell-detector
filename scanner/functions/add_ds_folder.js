function add_ds_folder(parent_node) {
    $('#ds_mod_folder_name').data('parent-node', parent_node);
    $('#ds_mod_folder_name').data('node-update', false);
    $('#ds_mod_folder_name').val('');
    $('#modal_ds_folder').modal("show");
}
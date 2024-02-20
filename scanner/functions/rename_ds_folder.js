function rename_ds_folder(parent_node, name) {
    $('#ds_mod_folder_name').data('parent-node', parent_node);
    $('#ds_mod_folder_name').data('node-update', true);
    $('#ds_mod_folder_name').val(name);
    $('#modal_ds_folder').modal("show");
}
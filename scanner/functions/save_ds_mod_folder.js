function save_ds_mod_folder() {
    var data = Object();

    data['parent_node'] = $('#ds_mod_folder_name').data('parent-node').replace('d-', '');
    data['folder_name'] =  $('#ds_mod_folder_name').val();
    data['csrf_token'] = $('#csrf_token').val();

    if ($('#ds_mod_folder_name').data('node-update')) {
        uri = '/datastore/folder/rename/' + data['parent_node'];
    } else {
        uri = '/datastore/folder/add';
    }

    post_request_api(uri, JSON.stringify(data))
    .done(function (data){
        if(notify_auto_api(data)){
            $('#modal_ds_folder').modal("hide");
            load_datastore();
        }
    });
}
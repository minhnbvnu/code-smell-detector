function validate_ds_folder_move() {
    var data_sent = Object();
    if ($(".node-selected").length === 0) {
        notify_error('No destination folder selected');
        return false;
    }
    if ($(".node-source-selected").length === 0) {
        notify_error('No initial folder to move');
        return false;
    }

    data_sent['destination-node'] = $(".node-selected").data('node-id').replace('d-', '');
    data_sent['csrf_token'] = $('#csrf_token').val();

    node_id = $(".node-source-selected").data('node-id').replace('d-', '');
    post_request_api('/datastore/folder/move/' + node_id, JSON.stringify(data_sent))
    .done((data) => {
        if (notify_auto_api(data)) {
            reset_ds_file_view();
            load_datastore();
        }
    });
}
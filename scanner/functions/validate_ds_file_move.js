function validate_ds_file_move() {
    var data_sent = Object();
    if ($(".node-selected").length === 0) {
        notify_error('No destination folder selected');
        return false;
    }
    if ($(".file-selected").length === 0) {
        notify_error('No file to move selected');
        return false;
    }

    data_sent['destination-node'] = $(".node-selected").data('node-id').replace('d-', '');
    data_sent['csrf_token'] = $('#csrf_token').val();
    index = 0;
    selected_files = $(".file-selected");
    selected_files.each((index) => {
        file_id = $(selected_files[index]).data('file-id').replace('f-', '');
        post_request_api('/datastore/file/move/' + file_id, JSON.stringify(data_sent))
        .done((data) => {
            if (notify_auto_api(data)) {
                if (index == $(".file-selected").length - 1) {
                    reset_ds_file_view();
                    load_datastore();
                }
                index +=1;
            }
        });
    });
}
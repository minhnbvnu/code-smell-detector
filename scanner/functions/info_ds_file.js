function info_ds_file(node) {
    node = node.replace('f-', '');
    url = '/datastore/file/info/'+ node +'/modal' + case_param();
    $('#modal_ds_file_content').load(url, function (response, status, xhr) {
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }

        $('#modal_ds_file').modal("show");
    });
}
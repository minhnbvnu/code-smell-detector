function add_folder(directory_id) {
    let data = Object();
    data['parent_id'] = directory_id;
    data['name'] = 'New folder';
    data['csrf_token'] = $('#csrf_token').val();

    post_request_api('/case/notes/directories/add', JSON.stringify(data))
    .done((data) => {
        if (notify_auto_api(data, true)) {
            rename_folder(data.data.id);
        }
    });
}
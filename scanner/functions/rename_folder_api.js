function rename_folder_api(directory_id, newName) {
    let data = Object();
    data['name'] = newName;
    data['csrf_token'] = $('#csrf_token').val();

    post_request_api(`/case/notes/directories/update/${directory_id}`,
        JSON.stringify(data))
    .done((data) => {
        if (notify_auto_api(data)) {
            load_directories();
        }
    });
}
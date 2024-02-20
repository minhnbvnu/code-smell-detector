function delete_folder_api(directory_id) {
    let data = Object();
    data['csrf_token'] = $('#csrf_token').val();

    post_request_api(`/case/notes/directories/delete/${directory_id}`,
        JSON.stringify(data))
    .done((data) => {
        if (notify_auto_api(data)) {
            load_directories();
        }
    });
}
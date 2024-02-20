async function move_folder_api(directory_id, new_parent_id) {
    let data = Object();
    data['csrf_token'] = $('#csrf_token').val();
    data['parent_id'] = new_parent_id;

    return post_request_api(`/case/notes/directories/update/${directory_id}`,
        JSON.stringify(data))
    .done((data) => {
        if (notify_auto_api(data)) {
            load_directories();
        }
    });
}
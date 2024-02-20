function delete_gtask(id) {
    post_request_api("/global/tasks/delete/" + id)
    .done((data) => {
        if(notify_auto_api(data)) {
            update_gtasks_list();
            $('#modal_add_gtask').modal('hide');
        }
    });
}
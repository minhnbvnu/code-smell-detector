function delete_task(id) {
    do_deletion_prompt("You are about to delete task #" + id)
    .then((doDelete) => {
        if (doDelete) {
            post_request_api("tasks/delete/" + id)
            .done((data) => {
                if(notify_auto_api(data)) {
                    get_tasks();
                    $('#modal_add_task').modal('hide');
                }
            });
        }
    });
}
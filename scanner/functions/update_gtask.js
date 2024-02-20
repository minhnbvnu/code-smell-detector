function update_gtask(id) {
    var data_sent = $('#form_new_gtask').serializeObject();
    data_sent['task_tags'] = $('#task_tags').val();
    data_sent['task_assignee_id'] = $('#task_assignee_id').val();
    data_sent['task_status_id'] = $('#task_status_id').val();
    data_sent['csrf_token'] = $('#csrf_token').val();

    post_request_api('/global/tasks/update/' + id, JSON.stringify(data_sent), true)
    .done((data) => {
        if(notify_auto_api(data)) {
            update_gtasks_list();
            $('#modal_add_gtask').modal('hide');
        }
    });
}
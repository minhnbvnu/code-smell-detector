function update_task_ext(task_id, do_close) {

    clear_api_error();
    if(!$('form#form_new_task').valid()) {
        return false;
    }

    if (task_id === undefined || task_id === null) {
        task_id = g_task_id;
    }

    var data_sent = $('#form_new_task').serializeObject();
    data_sent['task_tags'] = $('#task_tags').val();

    data_sent['task_assignees_id'] = $('#task_assignees_id').val();
    data_sent['task_status_id'] = $('#task_status_id').val();
    ret = get_custom_attributes_fields();
    has_error = ret[0].length > 0;
    attributes = ret[1];

    if (has_error){return false;}

    data_sent['custom_attributes'] = attributes;
    data_sent['task_description'] = g_task_desc_editor.getValue();

    $('#update_task_btn').text('Updating..');

    post_request_api('tasks/update/' + task_id, JSON.stringify(data_sent), true)
    .done((data) => {
        if(notify_auto_api(data)) {
            get_tasks();
            $('#submit_new_task').text("Saved").addClass('btn-outline-success').removeClass('btn-outline-danger').removeClass('btn-outline-warning');
            $('#last_saved').removeClass('btn-danger').addClass('btn-success');
            $('#last_saved > i').attr('class', "fa-solid fa-file-circle-check");

            if (do_close !== undefined && do_close === true) {
                $('#modal_add_task').modal('hide');
            }
        }
    })
    .always(() => {
        $('#update_task_btn').text('Update');
    });
}
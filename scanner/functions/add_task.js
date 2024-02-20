function add_task() {
    url = 'tasks/add/modal' + case_param();
    $('#modal_add_task_content').load(url, function (response, status, xhr) {
        hide_minimized_modal_box();
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }
        
        g_task_desc_editor = get_new_ace_editor('task_description', 'task_desc_content', 'target_task_desc',
                            function() {
                                $('#last_saved').addClass('btn-danger').removeClass('btn-success');
                                $('#last_saved > i').attr('class', "fa-solid fa-file-circle-exclamation");
                            }, null);
        g_task_desc_editor.setOption("minLines", "10");
        edit_in_task_desc();

        headers = get_editor_headers('g_task_desc_editor', null, 'task_edition_btn');
        $('#task_edition_btn').append(headers);

        $('#submit_new_task').on("click", function () {

            clear_api_error();
            if(!$('form#form_new_task').valid()) {
                return false;
            }

            var data_sent = $('#form_new_task').serializeObject();
            data_sent['task_tags'] = $('#task_tags').val();
            data_sent['task_assignees_id'] = $('#task_assignees_id').val();
            data_sent['task_status_id'] = $('#task_status_id').val();
            data_sent['task_description'] = g_task_desc_editor.getValue();
            ret = get_custom_attributes_fields();
            has_error = ret[0].length > 0;
            attributes = ret[1];

            if (has_error){return false;}

            data_sent['custom_attributes'] = attributes;

            post_request_api('tasks/add', JSON.stringify(data_sent), true)
            .done((data) => {
                if(notify_auto_api(data)) {
                    get_tasks();
                    $('#modal_add_task').modal('hide');
                }
            });

            return false;
        })
        $('#modal_add_task').modal({ show: true });
        $('#task_title').focus();

    });

}
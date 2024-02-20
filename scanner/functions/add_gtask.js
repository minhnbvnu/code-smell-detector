function add_gtask() {
    url = '/global/tasks/add/modal' + case_param();
    $('#modal_add_gtask_content').load(url, function (response, status, xhr) {
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }

        $('#submit_new_gtask').on("click", function () {
            var data_sent = $('#form_new_gtask').serializeObject();
            data_sent['task_tags'] = $('#task_tags').val();
            data_sent['task_assignees_id'] = $('#task_assignees_id').val();
            data_sent['task_status_id'] = $('#task_status_id').val();
            data_sent['csrf_token'] = $('#csrf_token').val();

            post_request_api('/global/tasks/add', JSON.stringify(data_sent), true)
            .done((data) => {
                if(notify_auto_api(data)) {
                    update_gtasks_list();
                    $('#modal_add_gtask').modal('hide');
                }
            });

            return false;
        })

    });

    $('#modal_add_gtask').modal({ show: true });
}
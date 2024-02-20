function dim_task_status(id) {
    url = '/dim/tasks/status/'+id + case_param();
    $('#info_dim_task_modal_body').load(url, function (response, status, xhr) {
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }
        $('#modal_dim_task_detail').modal({show:true});
    });
}
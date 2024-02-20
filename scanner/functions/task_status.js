function task_status(id) {
    url = 'tasks/status/human/'+id + case_param();
    $('#info_task_modal_body').load(url, function (response, status, xhr) {
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }
        $('#modal_task_detail').modal({show:true});
    });
}
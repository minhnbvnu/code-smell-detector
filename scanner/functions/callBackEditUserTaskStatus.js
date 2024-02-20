function callBackEditUserTaskStatus(updatedCell, updatedRow, oldValue) {
    data_send = updatedRow.data()
    data_send['csrf_token'] = $('#csrf_token').val();
    post_request_api("user/tasks/status/update", JSON.stringify(data_send))
    .done((data) => {
        if (notify_auto_api(data)) {
           update_utasks_list();
           UserTaskTable.columns.adjust().draw();
        }
    });
}
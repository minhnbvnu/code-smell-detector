function callBackEditTaskStatus(updatedCell, updatedRow, oldValue) {
  data_send = updatedRow.data();
  data_send['csrf_token'] = $('#csrf_token').val();
  tid = data_send['task_id'];

  post_request_api("tasks/status/update/" + tid, JSON.stringify(data_send))
  .done(function (data){
    if(notify_auto_api(data)) {
         get_tasks();
    }
  });
}
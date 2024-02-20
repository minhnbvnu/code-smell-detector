function edit_gtask(id) {
  url = '/global/tasks/update/'+ id + "/modal" + case_param();
  $('#modal_add_gtask_content').load(url, function (response, status, xhr) {
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }
        $('#modal_add_gtask').modal({show:true});
  });
}
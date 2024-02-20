function refresh_template_table() {
  $('#reports_table').DataTable().ajax.reload();
  notify_success("Refreshed");
}
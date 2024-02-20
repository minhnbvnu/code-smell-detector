function refresh_ioc_table() {
  $('#ioc_table').DataTable().ajax.reload();
  notify_success("Refreshed");
}
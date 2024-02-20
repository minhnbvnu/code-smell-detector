function refresh_classification_table() {
  $('#classification_table').DataTable().ajax.reload();
  notify_success("Refreshed");
}
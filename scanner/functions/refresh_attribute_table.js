function refresh_attribute_table() {
  $('#attributes_table').DataTable().ajax.reload();
  notify_success("Refreshed");
}
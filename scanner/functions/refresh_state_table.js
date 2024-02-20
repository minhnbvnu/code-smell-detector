function refresh_state_table() {
  $('#state_table').DataTable().ajax.reload();
  notify_success("Refreshed");
}
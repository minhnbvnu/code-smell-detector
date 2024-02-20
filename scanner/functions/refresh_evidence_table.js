function refresh_evidence_table() {
  $('#evidence_table').DataTable().ajax.reload();
  notify_success("Refreshed");
}
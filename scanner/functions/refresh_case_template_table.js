function refresh_case_template_table() {
  $('#case_templates_table').DataTable().ajax.reload();
  notify_success("Refreshed");
}
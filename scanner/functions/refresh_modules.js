function refresh_modules(silent) {
  $('#modules_table').DataTable().ajax.reload();
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
  if (silent === undefined || silent !== true) {
     notify_success("Modules refreshed");
  }
}
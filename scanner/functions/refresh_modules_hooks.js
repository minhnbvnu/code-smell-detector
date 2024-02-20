function refresh_modules_hooks(silent) {
  $('#hooks_table').DataTable().ajax.reload();
  if (silent === undefined || silent !== true) {
         notify_success("Hooks refreshed");
  }
}
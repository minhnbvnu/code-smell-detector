function refresh_asset_table() {
  $('#assets_table').DataTable().ajax.reload();
  notify_success("Refreshed");
}
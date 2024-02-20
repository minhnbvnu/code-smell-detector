function doCapture(client = {}, opts = {}) {
  return {
    host: opts.host || 'localhost',
    port_path_or_id: opts.path || opts.port || '6379',
    database_name: client.selected_db || opts.db || 0
  }
}
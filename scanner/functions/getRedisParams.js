function getRedisParams(clientOpts) {
  return {
    host: clientOpts?.socket?.host || 'localhost',
    port_path_or_id: clientOpts?.socket?.path || clientOpts?.socket?.port || '6379',
    database_name: clientOpts?.database || 0
  }
}
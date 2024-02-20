function getParametersFromHosts(hosts, database) {
  let [{ host, port }] = hosts
  const [{ socketPath }] = hosts

  if (socketPath) {
    port = socketPath
    host = 'localhost'
  }
  return {
    host,
    port_path_or_id: port,
    database_name: database
  }
}
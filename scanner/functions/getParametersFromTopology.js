function getParametersFromTopology(conf, database) {
  // in older versions of 3.x the host/port
  // lived directly on the topology
  let { host, port } = conf

  // servers is an array but we will always pull the first for consistency
  if (conf?.s?.options?.servers?.length) {
    ;[{ host, port }] = conf.s.options.servers
  }

  // host is a domain socket. set host as localhost and use the domain
  // socket host as the port
  if (host && host.endsWith('.sock')) {
    port = host
    host = 'localhost'
  }

  return {
    host: host,
    port_path_or_id: port,
    database_name: database
  }
}
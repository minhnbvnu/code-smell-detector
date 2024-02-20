function cmdStartedHandler(shim, evnt) {
  if (evnt.connectionId) {
    let [host, port] = parseAddress(evnt.address)

    // connection via socket get port from 1st host
    // socketPath property
    // which looks like mongodb:///tmp/mongodb-27017.sock"
    if (['undefined'].includes(host, port)) {
      host = 'localhost'
      const hosts = this.s.options.hosts
      if (hosts && hosts.length && hosts[0].socketPath) {
        port = hosts[0].socketPath
      }
    } else if (['127.0.0.1', '::1', '[::1]'].includes(host)) {
      host = 'localhost'
    }

    shim.captureInstanceAttributes(host, port, evnt.databaseName)
  }
}
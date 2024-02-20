function setHostPort(shim, connStr, db, client) {
  const parts = common.parseAddress(connStr)
  // in v3 when running with a cluster of socket connections
  // the address is `undefined:undefined`. we will instead attempt
  // to get connection details from the client symbol NR_ATTRS
  // added in `lib/instrumentation/mongodb/v3-mongo` when a client connects
  // with a URL string
  if (parts.includes('undefined')) {
    try {
      const attrs = client[common.NR_ATTRS]
      const socket = decodeURIComponent(attrs.split(',')[0].split('mongodb://')[1])
      shim.captureInstanceAttributes('localhost', socket, db)
    } catch (err) {
      shim.logger.debug(err, 'Could not extract host/port from mongo command')
    }
    // connected using domain socket but the "host"(e.g: /path/to/mongo-socket-port.sock)
  } else if (parts.length && parts[0][0] === '/') {
    shim.captureInstanceAttributes('localhost', parts[0], db)
  } else {
    shim.captureInstanceAttributes(parts[0], parts[1], db)
  }
}
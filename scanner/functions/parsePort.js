function parsePort(server) {
  let serverPort = null
  // store the port on which this transaction runs
  if (server.address instanceof Function) {
    const address = server.address()
    if (address) {
      serverPort = address.port
    }
  }
  return serverPort
}
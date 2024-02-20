function getInstanceParameters(shim, client) {
  if (hasOwnProperty(client, 'connection_options')) {
    // for redis 2.4.0 - 2.6.2
    return doCapture(client, client.connection_options)
  } else if (hasOwnProperty(client, 'connectionOption')) {
    // for redis 0.12 - 2.2.5
    return doCapture(client, client.connectionOption)
  } else if (hasOwnProperty(client, 'options')) {
    // for redis 2.3.0 - 2.3.1
    return doCapture(client, client.options)
  }
  shim.logger.debug('Could not access instance attributes on connection.')
  return doCapture()
}
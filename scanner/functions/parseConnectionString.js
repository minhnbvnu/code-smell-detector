function parseConnectionString(provider, connectionUrl) {
  let parameters = {}
  try {
    const parsedUrl = new URL(connectionUrl)
    parameters = {
      host: parsedUrl.hostname,
      port: parsedUrl.port,
      dbName: parsedUrl.pathname && decodeURIComponent(parsedUrl.pathname.split('/')[1])
    }
  } catch (err) {
    logger.warn('Failed to parse connection string for %s: %s', provider, err.message)
  }
  return parameters
}
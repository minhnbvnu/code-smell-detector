function requestHeadersHook(shim, { request, response }) {
  const { config } = shim.agent
  const activeSegment = request[symbols.segment]
  if (!activeSegment) {
    return
  }

  activeSegment.addSpanAttribute('http.statusCode', response.statusCode)
  activeSegment.addSpanAttribute('http.statusText', response.statusText)

  if (config.cross_application_tracer.enabled && !config.distributed_tracing.enabled) {
    try {
      const { appData } = cat.extractCatHeaders(response.headers)
      const decodedAppData = cat.parseAppData(config, appData)
      const attrs = activeSegment.getAttributes()
      const url = new URL(attrs.url)
      cat.assignCatToSegment(decodedAppData, activeSegment, url.host)
    } catch (err) {
      logger.warn(err, 'Cannot add CAT data to segment')
    }
  }
}
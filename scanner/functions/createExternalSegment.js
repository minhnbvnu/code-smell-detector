function createExternalSegment({ shim, request, parentSegment }) {
  const url = new URL(request.origin + request.path)
  const name = NAMES.EXTERNAL.PREFIX + url.host + url.pathname
  // Metrics for `External/<host>` will have a suffix of undici
  // We will have to see if this matters for people only using fetch
  // It's undici under the hood so ¯\_(ツ)_/¯
  const segment = shim.createSegment(name, recordExternal(url.host, 'undici'), parentSegment)
  if (segment) {
    segment.start()
    shim.setActiveSegment(segment)
    segment.addAttribute('url', `${url.protocol}//${url.host}${url.pathname}`)

    url.searchParams.forEach((value, key) => {
      segment.addSpanAttribute(`request.parameters.${key}`, value)
    })
    segment.addAttribute('procedure', request.method || 'GET')
    request[symbols.segment] = segment
  }
}
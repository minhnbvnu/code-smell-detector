function assignOutgoingHeaders(currentHeaders, outboundHeaders) {
  let headers

  if (Array.isArray(currentHeaders)) {
    headers = currentHeaders.slice()
    Array.prototype.push.apply(
      headers,
      Object.keys(outboundHeaders).map(function getHeaderTuples(key) {
        return [key, outboundHeaders[key]]
      })
    )
  } else {
    headers = Object.assign(Object.create(null), currentHeaders, outboundHeaders)
  }

  return headers
}
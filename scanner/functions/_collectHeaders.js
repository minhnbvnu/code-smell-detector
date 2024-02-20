function _collectHeaders(headers, nameMap, prefix, transaction) {
  if (!headers) {
    return
  }

  if (!transaction.agent.config.allow_all_headers) {
    headers = Object.keys(headers).reduce((collection, key) => {
      collection[key.toLowerCase()] = headers[key]
      return collection
    }, {})
  }

  const headerKeys = !transaction.agent.config.allow_all_headers
    ? COLLECTED_REQUEST_HEADERS
    : Object.keys(headers)

  const segment = transaction.agent.tracer.getSegment()

  for (let i = 0; i < headerKeys.length; i++) {
    const headerKey = headerKeys[i]
    let header = headers[headerKey]
    if (header !== undefined) {
      // If any more processing of the headers is required consider refactoring this.
      if (headerKey === 'referer' && typeof header === 'string') {
        const queryParamIndex = header.indexOf('?')
        if (queryParamIndex !== -1) {
          header = header.substring(0, queryParamIndex)
        }
      }

      const attributeName = nameMap[headerKey] || prefix + _headerToCamelCase(headerKey)
      transaction.trace.attributes.addAttribute(DESTS.TRANS_COMMON, attributeName, header)

      segment.addSpanAttribute(attributeName, header)
    }
  }
}
function collectResponseHeaders(headers, transaction) {
  _collectHeaders(headers, RESPONSE_HEADER_NAMES, RESPONSE_HEADER_PREFIX, transaction)
}
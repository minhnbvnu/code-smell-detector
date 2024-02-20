function setWebResponse(transaction, response) {
  transaction.statusCode = response.statusCode

  const responseCode = String(response.statusCode)

  if (/^\d+$/.test(responseCode)) {
    transaction.trace.attributes.addAttribute(
      ATTR_DEST.TRANS_COMMON,
      'http.statusCode',
      responseCode
    )

    // We are adding http.statusCode to base segment as
    // we found in testing async invoked lambdas, the
    // active segement is not available at this point.
    const segment = transaction.baseSegment

    segment.addSpanAttribute('http.statusCode', responseCode)
  }

  headerAttributes.collectResponseHeaders(response.headers, transaction)
}
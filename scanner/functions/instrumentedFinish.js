function instrumentedFinish(segment, transaction) {
  // Remove listeners so this doesn't get called twice.
  this.removeListener('finish', instrumentedFinish)
  this.removeListener('close', instrumentedFinish)

  // Naming must happen before the segment and transaction are ended,
  // because metrics recording depends on naming's side effects.
  transaction.finalizeNameFromUri(transaction.parsedUrl, this.statusCode)

  if (this) {
    const { statusCode, statusMessage } = this

    if (statusCode != null) {
      const responseCode = String(statusCode)

      if (/^\d+$/.test(responseCode)) {
        transaction.trace.attributes.addAttribute(
          DESTS.TRANS_COMMON,
          'http.statusCode',
          responseCode
        )

        segment.addSpanAttribute('http.statusCode', responseCode)
      }
    }

    if (statusMessage !== undefined) {
      transaction.trace.attributes.addAttribute(
        DESTS.TRANS_COMMON,
        'http.statusText',
        statusMessage
      )

      segment.addSpanAttribute('http.statusText', statusMessage)
    }

    const headers = this.getHeaders()
    if (headers) {
      headerAttributes.collectResponseHeaders(headers, transaction)
    }
  }

  // And we are done! End the segment and transaction.
  segment.end()
  transaction.end()
}
function initializeRequest(transaction, request) {
  headerAttributes.collectRequestHeaders(request.headers, transaction)

  if (request.method != null) {
    transaction.trace.attributes.addAttribute(DESTS.TRANS_COMMON, 'request.method', request.method)
    transaction.nameState.setVerb(request.method)
  }
}
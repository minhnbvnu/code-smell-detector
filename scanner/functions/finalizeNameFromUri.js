function finalizeNameFromUri(requestURL, statusCode) {
  if (logger.traceEnabled()) {
    logger.trace(
      {
        requestURL: requestURL,
        statusCode: statusCode,
        transactionId: this.id,
        transactionName: this.name
      },
      'Setting transaction name'
    )
  }

  this.url = urltils.scrub(requestURL)
  this.statusCode = statusCode
  this.name = this.getFullName()

  // If a namestate stack exists, copy route parameters over to the trace.
  if (!this.nameState.isEmpty() && this.baseSegment) {
    this.nameState.forEachParams(forEachRouteParams, this)
  }

  // Allow the API to explicitly set the ignored status.
  if (this.forceIgnore !== null) {
    this.ignore = this.forceIgnore
  }

  this.baseSegment && this._markAsWeb(requestURL)

  this._copyNameToActiveSpan(this.name)

  if (logger.traceEnabled()) {
    logger.trace(
      {
        transactionId: this.id,
        transactionName: this.name,
        ignore: this.ignore
      },
      'Finished setting transaction name from Uri'
    )
  }
}
function _addException(exception) {
  if (!this.isActive()) {
    logger.trace('Transaction is not active. Not capturing error: ', exception)
    return
  }

  this._linkExceptionToSegment(exception)
  this.exceptions.push(exception)
}
function _addUserError(exception) {
  if (!this.isActive()) {
    logger.trace('Transaction is not active. Not capturing user error: ', exception)
    return
  }

  this._linkExceptionToSegment(exception)
  this.userErrors.push(exception)
}
function setRouteParser(parser) {
  if (!this.isFunction(parser)) {
    this.logger.debug('Given route parser is not a function.')
    return
  }
  this._routeParser = parser
}
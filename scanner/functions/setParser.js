function setParser(parser) {
  if (this.isString(parser)) {
    const newParser = defaultParsers[parser]
    if (newParser) {
      this.queryParser = newParser
    } else {
      this.logger.debug(
        'Attempted to set the query parser to invalid parser %s, not setting new parser',
        parser
      )
    }
  } else if (this.isFunction(parser)) {
    this.queryParser = parser
  } else {
    this.logger.trace('Received invalid parser (%s)', parser)
  }
}
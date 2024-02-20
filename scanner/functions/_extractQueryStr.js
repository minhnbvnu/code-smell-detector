function _extractQueryStr(fn, fnName, spec, ctx, args) {
  let queryStr = spec.query
  if (this.isNumber(queryStr)) {
    const queryIdx = this.normalizeIndex(args.length, queryStr)
    if (queryIdx === null) {
      this.logger.debug('Invalid query index %d of %d', queryStr, args.length)
      return null
    }
    queryStr = args[queryIdx]
  } else if (this.isFunction(queryStr)) {
    queryStr = queryStr.call(ctx, this, fn, fnName, args)
  }

  return queryStr
}
function _wrapResolver(context, fn) {
  return function wrappedResolveReject(val) {
    const promise = context.promise
    if (promise && promise[symbols.context]) {
      promise[symbols.context].getSegment().touch()
    }
    fn(val)
  }
}
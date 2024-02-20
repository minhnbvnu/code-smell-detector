function _wrapExecutorContext(shim, args) {
  const context = {
    executor: args[0],
    promise: null,
    self: null,
    args: null
  }
  contextExporter[symbols.executorContext] = context
  args[0] = contextExporter

  /**
   *
   * @param {Function} resolve function of promise
   * @param {Function} reject function of promise
   */
  function contextExporter(resolve, reject) {
    context.self = this
    context.args = shim.argsToArray.apply(shim, arguments)
    context.args[0] = _wrapResolver(context, resolve)
    context.args[1] = _wrapResolver(context, reject)
  }
}
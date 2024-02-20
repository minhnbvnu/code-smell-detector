function contextExporter(resolve, reject) {
    context.self = this
    context.args = shim.argsToArray.apply(shim, arguments)
    context.args[0] = _wrapResolver(context, resolve)
    context.args[1] = _wrapResolver(context, reject)
  }
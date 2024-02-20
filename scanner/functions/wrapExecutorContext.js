function wrapExecutorContext(context) {
    return function contextExporter(resolve, reject) {
      context.self = this
      context.args = [].slice.call(arguments)
      context.args[0] = wrapResolver(context, resolve)
      context.args[1] = wrapResolver(context, reject)
    }
  }
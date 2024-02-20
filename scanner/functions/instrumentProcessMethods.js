function instrumentProcessMethods(shim, process) {
  const processMethods = ['nextTick', '_nextDomainTick', '_tickDomainCallback']

  shim.wrap(process, processMethods, function wrapProcess(shim, fn) {
    return function wrappedProcess() {
      const segment = shim.getActiveSegment()
      if (!segment) {
        return fn.apply(this, arguments)
      }

      // Manual copy because helper methods add significant overhead in some usages
      const len = arguments.length
      const args = new Array(len)
      for (let i = 0; i < len; ++i) {
        args[i] = arguments[i]
      }

      shim.bindSegment(args, shim.FIRST, segment)

      return fn.apply(this, args)
    }
  })
}
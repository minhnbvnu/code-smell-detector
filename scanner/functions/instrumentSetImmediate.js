function instrumentSetImmediate(shim, pkgs) {
  pkgs.forEach((nodule) => {
    if (shim.isWrapped(nodule.setImmediate)) {
      return
    }

    shim.wrap(nodule, 'setImmediate', function wrapSetImmediate(shim, fn) {
      return function wrappedSetImmediate() {
        const segment = shim.getActiveSegment()
        if (!segment) {
          return fn.apply(this, arguments)
        }

        const args = shim.argsToArray.apply(shim, arguments, segment)
        shim.bindSegment(args, shim.FIRST)

        return fn.apply(this, args)
      }
    })

    copySymbols(shim, nodule, 'setImmediate')
  })
}
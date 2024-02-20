function wrapChildProcessClass(shim, childProcessClass) {
    shim.wrap(childProcessClass.prototype, 'on', function wrapChildProcessClassOn(shim, fn) {
      return function wrappedChildProcessOn() {
        const args = shim.argsToArray.apply(shim, arguments)
        const cbIndex = args.length - 1

        const originalListener = args[cbIndex]
        if (!shim.isFunction(originalListener)) {
          return fn.apply(this, arguments)
        }

        shim.bindSegment(args, cbIndex)

        // Leverage events.removeListener() mechanism that checks listener
        // property to allow our wrapped listeners to match and remove appropriately.
        // Avoids having to instrument removeListener() and potentially doubling
        // lookup. Since our wrapping will only be referenced by the events
        // collection, we should not need to unwrap.
        args[cbIndex].listener = originalListener

        return fn.apply(this, args)
      }
    })
  }
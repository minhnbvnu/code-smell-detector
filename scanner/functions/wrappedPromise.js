function wrappedPromise(executor) {
    if (!(this instanceof wrappedPromise)) {
      return Promise(executor) // eslint-disable-line new-cap
    }

    const parent = contextManager.getContext()
    let promise = null
    if (
      !parent ||
      !parent.transaction.isActive() ||
      typeof executor !== 'function' ||
      arguments.length !== 1
    ) {
      // We are expecting one function argument for executor, anything else is
      // non-standard, do not attempt to wrap. Also do not attempt to wrap if we
      // are not in a transaction.
      const cnstrctArgs = agent.tracer.slice(arguments)
      cnstrctArgs.unshift(Promise) // `unshift` === `push_front`
      promise = new (Promise.bind.apply(Promise, cnstrctArgs))()
    } else {
      const segmentName = 'Promise ' + (executor.name || ANONYMOUS)
      const context = {
        promise: null,
        self: null,
        args: null
      }
      promise = new Promise(wrapExecutorContext(context))
      context.promise = promise
      const segment = _createSegment(segmentName)
      Contextualizer.link(null, promise, segment)

      segment.start()
      try {
        // Must run after promise is defined so that `__NR_wrapper` can be set.
        contextManager.runInContext(segment, executor, context.self, context.args)
      } catch (e) {
        context.args[1](e)
      } finally {
        segment.touch()
      }
    }

    // The Promise must be created using the "real" Promise constructor (using
    // normal Promise.apply(this) method does not work). But the prototype
    // chain must include the wrappedPromise.prototype, V8's promise
    // implementation uses promise.constructor to create new Promises for
    // calls to `then`, `chain` and `catch` which allows these Promises to
    // also be instrumented.
    promise.__proto__ = wrappedPromise.prototype // eslint-disable-line no-proto

    return promise
  }
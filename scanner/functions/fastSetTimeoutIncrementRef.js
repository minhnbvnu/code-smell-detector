function fastSetTimeoutIncrementRef() {
  global.setTimeout = function (cb) {
    const nodeTimeout = timeout(cb, 0)

    // This is a hack to keep tap from shutting down test early.
    // Is there a better way to do this?
    setImmediate(() => {
      nodeTimeout.ref()
    })

    return nodeTimeout
  }
}
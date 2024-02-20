function checkNotWrapped(cb, wrappedCB) {
    this.equal(wrappedCB, cb)
    this.notOk(shim.isWrapped(wrappedCB))
    this.end()
  }
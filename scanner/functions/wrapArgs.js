function wrapArgs(seg, callbacks, bindFunction) {
    t.equal(this, outer)
    t.equal(seg.name, 'my segment')
    return callbacks.map(function transfrom(arg) {
      if (typeof arg === 'function') {
        return bindFunction(arg)
      }
      return arg
    })
  }
function multiArgNextTick(fn) {
    const args = [].slice.call(arguments, 1)
    original(function callFn() {
      fn.apply(this, args)
    })
  }
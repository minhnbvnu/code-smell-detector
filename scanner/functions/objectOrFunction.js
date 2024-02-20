function objectOrFunction (x) {
    return typeof x === 'function' || typeof x === 'object' && x !== null
  }
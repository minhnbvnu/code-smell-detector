function wrapPromise() {
    spec.$static.$copy.forEach(function copyKeys(key) {
      if (!wrappedPromise[key]) {
        wrappedPromise[key] = Promise[key]
      }
    })

    spec.$static.$passThrough.forEach(function assignProxy(proxyProp) {
      if (!properties.hasOwn(wrappedPromise, proxyProp)) {
        Object.defineProperty(wrappedPromise, proxyProp, {
          enumerable: true,
          configurable: true,
          get: function getOriginal() {
            return Promise[proxyProp]
          },
          set: function setOriginal(newValue) {
            Promise[proxyProp] = newValue
          }
        })
      }
    })

    // Inherit to pass `instanceof` checks.
    util.inherits(wrappedPromise, Promise)

    // Make the wrapper.
    return wrappedPromise
  }
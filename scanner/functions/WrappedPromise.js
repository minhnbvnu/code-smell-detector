function WrappedPromise(executor) {
      const promise = new OriginalPromise(executor)
      promise.__proto__ = WrappedPromise.prototype
      return promise
    }
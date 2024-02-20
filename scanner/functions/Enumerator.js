function Enumerator (Constructor, input) {
    this._instanceConstructor = Constructor
    this.promise = new Constructor(noop)

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise)
    }

    if (isArray(input)) {
      this._input = input
      this.length = input.length
      this._remaining = input.length

      this._result = new Array(this.length)

      if (this.length === 0) {
        fulfill(this.promise, this._result)
      } else {
        this.length = this.length || 0
        this._enumerate()
        if (this._remaining === 0) {
          fulfill(this.promise, this._result)
        }
      }
    } else {
      _reject(this.promise, validationError())
    }
  }
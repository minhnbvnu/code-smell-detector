function DeferredPromise() {
    _classCallCheck(this, DeferredPromise);

    var self = this;
    this._update = false;
    this.promise = new ES6Promise(function (resolve, reject) {
      self.resolve = resolve;
      self.reject = reject;
    });
    var originalThen = this.promise.then;
    this.promise.then = function (ok, fail, update) {
      self._update = update;
      return originalThen.call(self.promise, ok, fail);
    };
  }
function passthroughPrototype(n) {
  // todo: liveness check?
  AppWindow.prototype[n] = function() {
    this.w[n].apply(this.w, arguments);
  }
}
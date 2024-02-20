function runtime_dispose() {
  this._computing = Promise.resolve();
  this._disposed = true;
  this._variables.forEach(v => {
    v._invalidate();
    v._version = NaN;
  });
}
function runtime_precompute(callback) {
  this._precomputes.push(callback);
  this._compute();
}
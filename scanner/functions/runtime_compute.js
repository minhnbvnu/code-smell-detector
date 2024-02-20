function runtime_compute() {
  return this._computing || (this._computing = this._computeSoon());
}
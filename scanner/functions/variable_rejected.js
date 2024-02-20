function variable_rejected(error) {
  if (this._observer.rejected) this._observer.rejected(error, this._name);
}
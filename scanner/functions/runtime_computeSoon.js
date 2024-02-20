function runtime_computeSoon() {
  return new Promise(frame).then(() => this._disposed ? undefined : this._computeNow());
}
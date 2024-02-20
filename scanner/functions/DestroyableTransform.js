function DestroyableTransform(opts) {
  Transform.call(this, opts)
  this._destroyed = false
}
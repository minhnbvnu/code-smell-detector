function AES (key) {
  this._key = asUInt32Array(key)
  this._reset()
}
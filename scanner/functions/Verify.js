function Verify (algorithm) {
  stream.Writable.call(this)

  var data = algorithms[algorithm]
  if (!data) throw new Error('Unknown message digest')

  this._hash = createHash(data.hash)
  this._tag = data.id
  this._signType = data.sign
}
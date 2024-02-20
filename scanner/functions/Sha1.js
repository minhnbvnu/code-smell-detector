function Sha1 () {
  this.init()
  this._w = W

  Hash.call(this, 64, 56)
}
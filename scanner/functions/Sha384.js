function Sha384 () {
  this.init()
  this._w = W

  Hash.call(this, 128, 112)
}
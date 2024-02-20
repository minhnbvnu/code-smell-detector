function NameState(prefix, verb, delimiter, path) {
  this.reset()
  this.setName(prefix, verb, delimiter, path)
  this._frozen = false
}
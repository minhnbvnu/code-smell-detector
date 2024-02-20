function ECDH (curve) {
  this.curveType = aliases[curve]
  if (!this.curveType) {
    this.curveType = {
      name: curve
    }
  }
  this.curve = new elliptic.ec(this.curveType.name) // eslint-disable-line new-cap
  this.keys = void 0
}
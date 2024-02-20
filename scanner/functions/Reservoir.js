function Reservoir(limit) {
  this.limit = limit || 10
  this.seen = 0
  this._data = []
}
function MetricMapper(raw) {
  this.unscoped = Object.create(null)
  this.scoped = Object.create(null)
  this.length = 0

  this.load(raw)
}
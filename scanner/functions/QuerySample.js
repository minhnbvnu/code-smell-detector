function QuerySample(tracer, slowQuery) {
  Stats.call(this)
  this.tracer = tracer
  this.trace = slowQuery
  this.aggregate(slowQuery)
}
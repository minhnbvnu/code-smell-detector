function Sampler(sampler, interval) {
  this.id = setInterval(sampler, interval)
  this.id.unref()
}
function Metrics(apdexT, mapper, normalizer) {
  if (apdexT == null || apdexT === '') {
    throw new Error('metrics must be created with apdexT')
  }
  if (!mapper) {
    throw new Error('metrics must be created with a mapper')
  }
  if (!normalizer) {
    throw new Error('metrics must be created with a name normalizer')
  }

  this.empty = true
  this.started = Date.now()
  this.apdexT = apdexT
  this.mapper = mapper
  this.normalizer = normalizer
  this.unscoped = Object.create(null) // {name : stats}
  this.scoped = Object.create(null) // {scope : {name : stats}}
}
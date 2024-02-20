function SlowQuery(segment, type, query, trace) {
  this.obfuscated = obfuscate(query, type)
  this.normalized = this.obfuscated.replace(/\?\s*,\s*|\s*/g, '')
  this.id = normalizedHash(this.normalized)
  this.segment = segment
  this.query = query
  this.metric = segment.name
  this.trace = formatTrace(trace)
  this.duration = segment.getDurationInMillis()
}
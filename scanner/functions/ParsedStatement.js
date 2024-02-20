function ParsedStatement(type, operation, collection, raw) {
  this.type = type
  this.operation = operation
  this.collection = collection
  this.trace = null
  this.raw = ''

  if (typeof raw === 'string') {
    this.trace = new Error().stack
    this.raw = raw
  }
}
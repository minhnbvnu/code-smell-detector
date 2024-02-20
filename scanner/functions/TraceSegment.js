function TraceSegment(transaction, name, recorder) {
  this.name = name
  this.transaction = transaction

  ++transaction.numSegments
  ++transaction.agent.totalActiveSegments
  ++transaction.agent.segmentsCreatedInHarvest

  if (recorder) {
    transaction.addRecorder(recorder.bind(null, this))
  }

  this.attributes = new Attributes(ATTRIBUTE_SCOPE)

  this.children = []

  // Generate a unique id for use in span events.
  this.id = hashes.makeId()
  this.timer = new Timer()

  this.internal = false
  this.opaque = false
  this.shim = null

  // hidden class optimization
  this.partialName = null
  this._exclusiveDuration = null
  this._collect = true
  this.host = null
  this.port = null
  this.state = STATE.EXTERNAL
  this.async = true
  this.ignore = false

  this.probe('new TraceSegment')
}
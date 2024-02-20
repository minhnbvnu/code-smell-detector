function Transaction(agent) {
  if (!agent) {
    throw new Error('every transaction must be bound to the agent')
  }

  this.traceFlag = false
  if (agent.config.logging.diagnostics) {
    this.traceStacks = []
  } else {
    this.traceStacks = null
  }

  this.agent = agent
  this.metrics = new Metrics(agent.config.apdex_t, agent.mapper, agent.metricNameNormalizer)

  ++agent.activeTransactions

  this.numSegments = 0
  this.id = hashes.makeId(16)

  this.trace = new Trace(this)
  this.exceptions = []
  this.userErrors = []
  this.timer = new Timer()
  this.timer.begin()

  this._recorders = []
  this._intrinsicAttributes = Object.create(null)
  this._partialName = null

  // If handledExternally is set to true the transaction will not ended
  // automatically, instead it should be ended by user code.
  this.handledExternally = false

  // hidden class optimization
  this.catResponseTime = 0
  this.error = null
  this.forceIgnore = null
  this.forceName = null
  this.ignore = false
  this.incomingCatId = null
  this.name = null
  this.nameState = new NameState(null, null, null, null)
  this.pathHashes = []
  this.queueTime = 0
  this.referringPathHash = null
  this.referringTransactionGuid = null
  this.invalidIncomingExternalTransaction = false
  this.statusCode = null
  this.syntheticsHeader = null
  this.syntheticsInfoHeader = null
  this.syntheticsData = null
  this.syntheticsInfoData = null
  this.url = null
  this.parsedUrl = null
  this.verb = null
  this.baseSegment = null
  this.type = TYPES.WEB
  // DT fields
  this.parentId = null
  this.parentType = null
  this.parentApp = null
  this.parentAcct = null
  this.parentTransportType = null
  this.parentTransportDuration = null
  this._traceId = null
  Object.defineProperty(this, 'traceId', {
    get() {
      if (this._traceId === null) {
        this._traceId = hashes.makeId(32)
      }
      return this._traceId
    },
    set(traceId) {
      this._traceId = traceId
    }
  })
  this.parentSpanId = null
  this.isDistributedTrace = null
  this.acceptedDistributedTrace = null

  // LLM fields.
  this.llm = {
    responses: new Map()
  }

  // Lazy evaluate the priority and sampling in case we end up accepting a payload.
  this.priority = null
  this.sampled = null
  this.traceContext = new TraceContext(this)
  this.logs = new Logs(agent)

  agent.emit('transactionStarted', this)
  this.probe('Transaction created', { id: this.id })
}
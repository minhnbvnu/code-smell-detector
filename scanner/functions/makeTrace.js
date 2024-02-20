async function makeTrace(t, agent) {
  const DURATION = 33
  const URL = '/test?test=value'
  agent.config.attributes.enabled = true
  agent.config.attributes.include = ['request.parameters.*']
  agent.config.emit('attributes.include')

  const transaction = new Transaction(agent)
  transaction.trace.attributes.addAttribute(DESTINATIONS.TRANS_COMMON, 'request.uri', URL)
  transaction.url = URL
  transaction.verb = 'GET'

  transaction.timer.setDurationInMillis(DURATION)

  const trace = transaction.trace

  // promisifying `trace.generateJSON` so tests do not have to call done
  // and instead use async/await
  trace.generateJSONAsync = util.promisify(trace.generateJSON)
  const start = trace.root.timer.start
  t.ok(start > 0, "root segment's start time")
  trace.setDurationInMillis(DURATION, 0)

  const web = trace.root.add(URL)
  transaction.baseSegment = web
  transaction.finalizeNameFromUri(URL, 200)
  // top-level element will share a duration with the quasi-ROOT node
  web.setDurationInMillis(DURATION, 0)

  const db = web.add('Database/statement/AntiSQL/select/getSome')
  db.setDurationInMillis(14, 3)

  const memcache = web.add('Datastore/operation/Memcache/lookup')
  memcache.setDurationInMillis(20, 8)

  trace.end()

  /*
   * Segment data repeats the outermost data, nested, with the scope for the
   * outermost version having its scope always set to 'ROOT'. The null bits
   * are parameters, which are optional, and so far, unimplemented for Node.
   */
  const rootSegment = [
    0,
    DURATION,
    'ROOT',
    { nr_exclusive_duration_millis: 0 },
    [
      [
        0,
        DURATION,
        'WebTransaction/NormalizedUri/*',
        {
          'request.uri': '/test?test=value',
          'request.parameters.test': 'value',
          'nr_exclusive_duration_millis': 8
        },
        [
          // TODO: ensure that the ordering is correct WRT start time
          db.toJSON(),
          memcache.toJSON()
        ]
      ]
    ]
  ]

  const rootNode = [
    trace.root.timer.start / 1000,
    {},
    { nr_flatten_leading: false },
    rootSegment,
    {
      agentAttributes: {
        'request.uri': '/test?test=value',
        'request.parameters.test': 'value'
      },
      userAttributes: {},
      intrinsics: {}
    },
    [] // FIXME: parameter groups
  ]

  const encoded = await codecEncodeAsync(rootNode)
  return {
    transaction,
    trace,
    rootSegment,
    rootNode,
    expectedEncoding: [
      0,
      DURATION,
      'WebTransaction/NormalizedUri/*', // scope
      '/test', // URI path
      encoded, // compressed segment / segment data
      transaction.id, // guid
      null, // reserved, always NULL
      false, // FIXME: RUM2 session persistence, not worrying about it for now
      null, // FIXME: xraysessionid
      null // syntheticsResourceId
    ]
  }
}
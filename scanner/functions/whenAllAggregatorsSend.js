function whenAllAggregatorsSend(agent) {
  const metricPromise = new Promise((resolve) => {
    agent.metrics.once('finished metric_data data send.', function onMetricsFinished() {
      resolve()
    })
  })

  const spanPromise = new Promise((resolve) => {
    agent.spanEventAggregator.once(
      'finished span_event_data data send.',
      function onSpansFinished() {
        resolve()
      }
    )
  })

  const customEventPromise = new Promise((resolve) => {
    agent.customEventAggregator.once(
      'finished custom_event_data data send.',
      function onCustomEventsFinished() {
        resolve()
      }
    )
  })

  const transactionEventPromise = new Promise((resolve) => {
    agent.transactionEventAggregator.once(
      'finished analytic_event_data data send.',
      function onTransactionEventsFinished() {
        resolve()
      }
    )
  })

  const transactionTracePromise = new Promise((resolve) => {
    agent.traces.once('finished transaction_sample_data data send.', function onTracesFinished() {
      resolve()
    })
  })

  const sqlTracePromise = new Promise((resolve) => {
    agent.queries.once('finished sql_trace_data data send.', function onSqlTracesFinished() {
      resolve()
    })
  })

  const errorTracePromise = new Promise((resolve) => {
    agent.errors.traceAggregator.once(
      'finished error_data data send.',
      function onErrorTracesFinished() {
        resolve()
      }
    )
  })

  const errorEventPromise = new Promise((resolve) => {
    agent.errors.eventAggregator.once(
      'finished error_event_data data send.',
      function onErrorEventsFinished() {
        resolve()
      }
    )
  })

  const promises = [
    metricPromise,
    spanPromise,
    customEventPromise,
    transactionEventPromise,
    transactionTracePromise,
    sqlTracePromise,
    errorTracePromise,
    errorEventPromise
  ]

  return Promise.all(promises)
}
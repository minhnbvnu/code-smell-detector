function sendErrors() {
  const errData = {
    count: newrelic.agent.errors.traceAggregator.errors.length,
    messages: newrelic.agent.errors.traceAggregator.errors.map((e) => {
      return e[2]
    })
  }

  process.send(errData)
}
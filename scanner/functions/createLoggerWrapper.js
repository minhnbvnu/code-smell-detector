function createLoggerWrapper(shim, fn, fnName, bunyanLogger, nameFromLevel) {
  const agent = shim.agent

  createModuleUsageMetric('bunyan', agent.metrics)

  // forward logs via the agent logs aggregator
  bunyanLogger.addStream({
    name: 'NRLogForwarder',
    type: 'raw',
    level: bunyanLogger.level(),
    stream: {
      write: function nrLogWrite(logLine) {
        agent.logs.add(augmentLogData(logLine, agent, nameFromLevel))
      }
    }
  })
  // no return here means the original return value is preserved
}
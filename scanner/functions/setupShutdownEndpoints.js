function setupShutdownEndpoints(runId) {
  // Final harvest
  return {
    metric_data: nockRequest('metric_data', runId).reply(200),
    shutdown: nockRequest('shutdown', runId).reply(200)
  }
}
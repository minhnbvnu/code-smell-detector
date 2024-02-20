function postFlowPerformance (projectId, flowId, startTime, endTime, resolve) {
  return {
    type: LOAD_FLOW_PERFORMANCE,
    payload: {
      projectId,
      flowId,
      startTime,
      endTime,
      resolve
    }
  }
}
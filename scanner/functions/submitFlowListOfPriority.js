function submitFlowListOfPriority (projectId, streamId, action, flows, resolve, reject) {
  return {
    type: SET_FLOW_PRIORITY,
    payload: {
      projectId,
      streamId,
      action,
      flows,
      resolve,
      reject
    }
  }
}
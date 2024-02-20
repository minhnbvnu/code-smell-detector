function loadDriftList (projectId, flowId, resolve) {
  return {
    type: LOAD_DRIFT_LIST,
    payload: {
      projectId,
      flowId,
      resolve
    }
  }
}
function loadFlowList (projectId, streamId, resolve) {
  return {
    type: LOAD_FLOW_LIST,
    payload: {
      projectId,
      streamId,
      resolve
    }
  }
}
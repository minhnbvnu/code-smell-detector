function postDriftList (projectId, flowId, streamId, resolve) {
  return {
    type: POST_DRIFT,
    payload: {
      projectId,
      flowId,
      streamId,
      resolve
    }
  }
}
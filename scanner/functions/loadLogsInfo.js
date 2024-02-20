function loadLogsInfo (projectId, streamId, resolve) {
  return {
    type: LOAD_LOGS_INFO,
    payload: {
      projectId,
      streamId,
      resolve
    }
  }
}
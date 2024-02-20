function loadUserStreams (projectId, resolve) {
  return {
    type: LOAD_USER_STREAMS,
    payload: {
      projectId,
      resolve
    }
  }
}
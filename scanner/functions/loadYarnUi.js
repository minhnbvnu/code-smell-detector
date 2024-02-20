function loadYarnUi (projectId, streamId, resolve) {
  return {
    type: LOAD_YARN_UI,
    payload: {
      projectId,
      streamId,
      resolve
    }
  }
}
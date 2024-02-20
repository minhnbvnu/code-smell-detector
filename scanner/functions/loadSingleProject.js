function loadSingleProject (projectId, resolve) {
  return {
    type: LOAD_SINGLE_PROJECT,
    payload: {
      projectId,
      resolve
    }
  }
}
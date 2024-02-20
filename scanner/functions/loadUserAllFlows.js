function loadUserAllFlows (projectId, resolve) {
  return {
    type: LOAD_USER_ALL_FLOWS,
    payload: {
      projectId,
      resolve
    }
  }
}
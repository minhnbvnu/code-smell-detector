function loadAdminSingleFlow (projectId, resolve) {
  return {
    type: LOAD_ADMIN_SINGLE_FLOW,
    payload: {
      projectId,
      resolve
    }
  }
}
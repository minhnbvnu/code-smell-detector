function loadAdminSingleStream (projectId, resolve) {
  return {
    type: LOAD_ADMIN_SINGLE_STREAM,
    payload: {
      projectId,
      resolve
    }
  }
}
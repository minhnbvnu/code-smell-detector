function loadAdminSingleJob (projectId, resolve) {
  return {
    type: LOAD_ADMIN_SINGLE_JOB,
    payload: {
      projectId,
      resolve
    }
  }
}
function loadUserAllJobs (projectId, resolve) {
  return {
    type: LOAD_USER_ALL_JOBS,
    payload: {
      projectId,
      resolve
    }
  }
}
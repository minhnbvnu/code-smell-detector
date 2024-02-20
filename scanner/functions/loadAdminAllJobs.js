function loadAdminAllJobs (resolve) {
  return {
    type: LOAD_ADMIN_ALL_JOBS,
    payload: {
      resolve
    }
  }
}
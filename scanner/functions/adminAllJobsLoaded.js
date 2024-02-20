function adminAllJobsLoaded (jobs) {
  return {
    type: LOAD_ADMIN_ALL_JOBS_SUCCESS,
    payload: {
      jobs
    }
  }
}
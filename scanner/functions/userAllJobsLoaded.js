function userAllJobsLoaded (jobs) {
  return {
    type: LOAD_USER_ALL_JOBS_SUCCESS,
    payload: {
      jobs
    }
  }
}
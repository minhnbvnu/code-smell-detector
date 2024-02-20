function adminSingleJobLoaded (job) {
  return {
    type: LOAD_ADMIN_SINGLE_JOB_SUCCESS,
    payload: {
      job
    }
  }
}
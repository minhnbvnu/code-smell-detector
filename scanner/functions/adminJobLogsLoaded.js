function adminJobLogsLoaded (result) {
  return {
    type: LOAD_ADMIN_JOB_LOGS_SUCCESS,
    payload: {
      result
    }
  }
}
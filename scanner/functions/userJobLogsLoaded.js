function userJobLogsLoaded (result) {
  return {
    type: LOAD_USER_JOB_LOGS_SUCCESS,
    payload: {
      result
    }
  }
}
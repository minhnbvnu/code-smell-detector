function adminLogsInfoLoaded (result) {
  return {
    type: LOAD_ADMIN_LOGS_INFO_SUCCESS,
    payload: {
      result
    }
  }
}
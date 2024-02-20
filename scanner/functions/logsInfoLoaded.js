function logsInfoLoaded (result) {
  return {
    type: LOAD_LOGS_INFO_SUCCESS,
    payload: {
      result
    }
  }
}
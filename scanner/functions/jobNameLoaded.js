function jobNameLoaded (result) {
  return {
    type: LOAD_JOB_NAME_SUCCESS,
    payload: {
      result
    }
  }
}
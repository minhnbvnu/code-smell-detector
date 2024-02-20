function jobNameLoadedError (message) {
  return {
    type: LOAD_JOB_NAME_ERROR,
    payload: {
      message
    }
  }
}
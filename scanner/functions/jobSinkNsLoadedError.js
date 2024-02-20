function jobSinkNsLoadedError (result) {
  return {
    type: LOAD_JOB_SINKNS_ERROR,
    payload: {
      result
    }
  }
}
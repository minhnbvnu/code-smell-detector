function jobSinkNsLoaded (result) {
  return {
    type: LOAD_JOB_SINKNS_SUCCESS,
    payload: {
      result
    }
  }
}
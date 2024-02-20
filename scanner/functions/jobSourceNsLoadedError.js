function jobSourceNsLoadedError (result) {
  return {
    type: LOAD_JOB_SOURCENS_ERROR,
    payload: {
      result
    }
  }
}
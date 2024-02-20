function jobSourceNsLoaded (result) {
  return {
    type: LOAD_JOB_SOURCENS_SUCCESS,
    payload: {
      result
    }
  }
}
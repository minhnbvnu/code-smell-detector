function jobDetailLoaded (result) {
  return {
    type: LOAD_JOB_DETAIL_SUCCESS,
    payload: {
      result
    }
  }
}
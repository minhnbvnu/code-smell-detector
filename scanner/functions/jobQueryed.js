function jobQueryed (result) {
  return {
    type: QUERY_JOB_SUCCESS,
    payload: {
      result
    }
  }
}
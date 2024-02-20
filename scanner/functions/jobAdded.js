function jobAdded (result) {
  return {
    type: ADD_JOB_SUCCESS,
    payload: {
      result
    }
  }
}
function jobEdited (result) {
  return {
    type: EDIT_JOB_SUCCESS,
    payload: {
      result
    }
  }
}
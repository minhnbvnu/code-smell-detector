function logFormEdited (result) {
  return {
    type: EDIT_LOGFORM_SUCCESS,
    payload: {
      result
    }
  }
}
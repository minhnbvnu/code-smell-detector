function logFormEditingError (error) {
  return {
    type: EDIT_LOGFORM_ERROR,
    payload: {
      error
    }
  }
}
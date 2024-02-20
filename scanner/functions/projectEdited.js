function projectEdited (result) {
  return {
    type: EDIT_PROJECT_SUCCESS,
    payload: {
      result
    }
  }
}
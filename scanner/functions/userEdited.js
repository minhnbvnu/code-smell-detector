function userEdited (result) {
  return {
    type: EDIT_USER_SUCCESS,
    payload: {
      result
    }
  }
}
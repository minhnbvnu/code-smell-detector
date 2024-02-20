function projectEditedError (result) {
  return {
    type: EDIT_PROJECT_ERROR,
    payload: {
      result
    }
  }
}
function singleProjectDeletedError (result) {
  return {
    type: DELETE_SINGLE_PROJECT_ERROR,
    payload: {
      result
    }
  }
}
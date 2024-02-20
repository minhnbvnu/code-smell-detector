function singleProjectDeleted (result) {
  return {
    type: DELETE_SINGLE_PROJECT_SUCCESS,
    payload: {
      result
    }
  }
}
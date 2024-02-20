function projectAdded (result) {
  return {
    type: ADD_PROJECT_SUCCESS,
    payload: {
      result
    }
  }
}
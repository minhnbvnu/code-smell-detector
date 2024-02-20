function nsDeleted (result) {
  return {
    type: DELETE_NS_SUCCESS,
    payload: {
      result
    }
  }
}
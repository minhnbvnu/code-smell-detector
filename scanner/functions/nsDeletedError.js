function nsDeletedError (result) {
  return {
    type: DELETE_NS_ERROR,
    payload: {
      result
    }
  }
}
function instanceDeletedError (result) {
  return {
    type: DELETE_INSTANCE_ERROR,
    payload: {
      result
    }
  }
}
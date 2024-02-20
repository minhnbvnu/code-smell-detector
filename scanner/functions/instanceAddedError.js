function instanceAddedError (result) {
  return {
    type: ADD_INSTANCE_ERROR,
    payload: {
      result
    }
  }
}
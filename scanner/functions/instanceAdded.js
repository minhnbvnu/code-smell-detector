function instanceAdded (result) {
  return {
    type: ADD_INSTANCE_SUCCESS,
    payload: {
      result
    }
  }
}
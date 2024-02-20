function instanceDeleted (result) {
  return {
    type: DELETE_INSTANCE_SUCCESS,
    payload: {
      result
    }
  }
}
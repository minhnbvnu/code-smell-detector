function streamDeleted (result) {
  return {
    type: DELETE_STREAMS_SUCCESS,
    payload: {
      result
    }
  }
}
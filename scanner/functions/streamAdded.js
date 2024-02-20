function streamAdded (result) {
  return {
    type: ADD_STREAMS_SUCCESS,
    payload: {
      result
    }
  }
}
function streamEdited (result) {
  return {
    type: EDIT_STREAM_SUCCESS,
    payload: {
      result
    }
  }
}
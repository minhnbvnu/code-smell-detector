function streamDetailLoaded (result) {
  return {
    type: LOAD_STREAM_DETAIL_SUCCESS,
    payload: {
      result
    }
  }
}
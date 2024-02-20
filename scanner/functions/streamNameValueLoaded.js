function streamNameValueLoaded (result) {
  return {
    type: LOAD_STREAM_NAME_VALUE_SUCCESS,
    payload: {
      result
    }
  }
}
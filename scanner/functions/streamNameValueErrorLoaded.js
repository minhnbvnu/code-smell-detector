function streamNameValueErrorLoaded (result) {
  return {
    type: LOAD_STREAM_NAME_VALUE_ERROR,
    payload: {
      result
    }
  }
}
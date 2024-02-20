function adminSingleStreamLoaded (stream) {
  return {
    type: LOAD_ADMIN_SINGLE_STREAM_SUCCESS,
    payload: {
      stream
    }
  }
}
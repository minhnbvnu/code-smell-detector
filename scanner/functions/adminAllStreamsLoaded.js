function adminAllStreamsLoaded (streams) {
  return {
    type: LOAD_ADMIN_ALL_STREAMS_SUCCESS,
    payload: {
      streams
    }
  }
}
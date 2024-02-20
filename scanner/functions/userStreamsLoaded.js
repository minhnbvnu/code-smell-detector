function userStreamsLoaded (streams) {
  return {
    type: LOAD_USER_STREAMS_SUCCESS,
    payload: {
      streams
    }
  }
}
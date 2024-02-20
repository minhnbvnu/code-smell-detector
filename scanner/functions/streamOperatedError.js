function streamOperatedError (message) {
  return {
    type: OPERATE_STREAMS_ERROR,
    payload: {
      message
    }
  }
}
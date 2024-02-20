function streamStartOrRenewed (result) {
  return {
    type: STARTORRENEW_STREAMS_SUCCESS,
    payload: {
      result
    }
  }
}
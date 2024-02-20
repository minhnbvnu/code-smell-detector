function streamOperated (result) {
  return {
    type: OPERATE_STREAMS_SUCCESS,
    payload: {
      result
    }
  }
}
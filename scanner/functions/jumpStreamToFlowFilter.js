function jumpStreamToFlowFilter (streamFilterId) {
  return {
    type: JUMP_STREAM_TO_FLOW_FILTER,
    payload: {
      streamFilterId
    }
  }
}
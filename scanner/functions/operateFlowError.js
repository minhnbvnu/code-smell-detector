function operateFlowError (message) {
  return {
    type: OPERATE_FLOW_ERROR,
    payload: {
      message
    }
  }
}
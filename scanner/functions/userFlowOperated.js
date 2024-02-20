function userFlowOperated (result) {
  return {
    type: OPERATE_USER_FLOW_SUCCESS,
    payload: {
      result
    }
  }
}
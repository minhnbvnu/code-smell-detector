function flinkFlowStartSucc (result) {
  return {
    type: STARTFLINK_FLOWS_SUCCESS,
    payload: {
      result
    }
  }
}
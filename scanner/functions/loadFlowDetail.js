function loadFlowDetail (value, resolve) {
  return {
    type: LOAD_FLOW_DETAIL,
    payload: {
      value,
      resolve
    }
  }
}
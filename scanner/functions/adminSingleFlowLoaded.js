function adminSingleFlowLoaded (flow) {
  return {
    type: LOAD_ADMIN_SINGLE_FLOW_SUCCESS,
    payload: {
      flow
    }
  }
}
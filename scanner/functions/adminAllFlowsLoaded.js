function adminAllFlowsLoaded (flows) {
  return {
    type: LOAD_ADMIN_ALL_FLOWS_SUCCESS,
    payload: {
      flows
    }
  }
}
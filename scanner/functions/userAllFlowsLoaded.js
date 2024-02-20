function userAllFlowsLoaded (flows) {
  return {
    type: LOAD_USER_ALL_FLOWS_SUCCESS,
    payload: {
      flows
    }
  }
}
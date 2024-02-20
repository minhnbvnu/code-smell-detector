function flowListLoaded (flows) {
  return {
    type: LOAD_FLOW_LIST_SUCCESS,
    payload: {
      flows
    }
  }
}
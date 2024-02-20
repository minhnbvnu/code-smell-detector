function flowQueryed (result) {
  return {
    type: QUERY_FLOW_SUCCESS,
    payload: {
      result
    }
  }
}
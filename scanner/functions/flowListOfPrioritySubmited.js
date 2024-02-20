function flowListOfPrioritySubmited (result) {
  return {
    type: SET_FLOW_PRIORITY_SUCCESS,
    payload: {
      result
    }
  }
}
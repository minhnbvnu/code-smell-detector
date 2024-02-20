function flowAdded (result) {
  return {
    type: ADD_FLOWS_SUCCESS,
    payload: {
      result
    }
  }
}
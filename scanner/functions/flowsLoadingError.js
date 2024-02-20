function flowsLoadingError (error) {
  return {
    type: LOAD_FLOWS_ERROR,
    payload: {
      error
    }
  }
}
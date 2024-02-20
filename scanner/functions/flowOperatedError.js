function flowOperatedError (message) {
  return {
    type: OPERATE_FLOWS_ERROR,
    payload: {
      message
    }
  }
}
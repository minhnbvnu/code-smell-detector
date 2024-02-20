function getError (error) {
  return {
    type: GET_ERROR,
    payload: {
      error
    }
  }
}
function sourceInputLoadingError (error) {
  return {
    type: LOAD_SOURCEINPUT_ERROR,
    payload: {
      error
    }
  }
}
function sinkWriteRrrorDetailLoadingError (error) {
  return {
    type: LOAD_SINKWRITERROR_DETAIL_ERROR,
    payload: {
      error
    }
  }
}
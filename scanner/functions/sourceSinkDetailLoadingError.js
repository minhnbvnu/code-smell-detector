function sourceSinkDetailLoadingError (error) {
  return {
    type: LOAD_SOURCESINK_DETAIL_ERROR,
    payload: {
      error
    }
  }
}
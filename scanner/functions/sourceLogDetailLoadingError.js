function sourceLogDetailLoadingError (error) {
  return {
    type: LOAD_SOURCELOG_DETAIL_ERROR,
    payload: {
      error
    }
  }
}
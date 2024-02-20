function singleDatabaseLoaded (result) {
  return {
    type: LOAD_SINGLE_DATABASE_SUCCESS,
    payload: {
      result
    }
  }
}
function databaseAddedError (result) {
  return {
    type: ADD_DATABASE_ERROR,
    payload: {
      result
    }
  }
}
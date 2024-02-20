function databaseEdited (result) {
  return {
    type: EDIT_DATABASE_SUCCESS,
    payload: {
      result
    }
  }
}
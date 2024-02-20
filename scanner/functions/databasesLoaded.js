function databasesLoaded (databases) {
  return {
    type: LOAD_DATABASES_SUCCESS,
    payload: {
      databases
    }
  }
}
function namespaceDatabaseLoaded (database) {
  return {
    type: LOAD_NAMESPACE_DATABASE_SUCCESS,
    payload: {
      database
    }
  }
}
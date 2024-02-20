function databasesInstanceLoaded (result) {
  return {
    type: LOAD_DATABASES_INSTANCE_SUCCESS,
    payload: {
      result
    }
  }
}
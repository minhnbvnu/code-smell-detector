function loadDatabasesInstance (value, resolve) {
  return {
    type: LOAD_DATABASES_INSTANCE,
    payload: {
      value,
      resolve
    }
  }
}
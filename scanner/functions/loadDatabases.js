function loadDatabases (resolve) {
  return {
    type: LOAD_DATABASES,
    payload: {
      resolve
    }
  }
}
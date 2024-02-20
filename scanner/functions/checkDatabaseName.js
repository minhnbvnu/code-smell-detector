function checkDatabaseName (id, name, resolve, reject) {
  return {
    type: CHECK_DATABASE,
    payload: {
      id,
      name,
      resolve,
      reject
    }
  }
}
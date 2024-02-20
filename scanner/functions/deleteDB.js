function deleteDB (databaseId, resolve, reject) {
  return {
    type: DELETE_DB,
    payload: {
      databaseId,
      resolve,
      reject
    }
  }
}
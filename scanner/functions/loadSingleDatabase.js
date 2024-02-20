function loadSingleDatabase (databaseId, resolve) {
  return {
    type: LOAD_SINGLE_DATABASE,
    payload: {
      databaseId,
      resolve
    }
  }
}
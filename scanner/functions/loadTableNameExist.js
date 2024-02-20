function loadTableNameExist (value, resolve, reject) {
  return {
    type: LOAD_TABLE_NAME_EXIST,
    payload: {
      value,
      resolve,
      reject
    }
  }
}
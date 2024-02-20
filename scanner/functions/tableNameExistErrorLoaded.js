function tableNameExistErrorLoaded (result) {
  return {
    type: LOAD_TABLE_NAME_EXIST_ERROR,
    payload: {
      result
    }
  }
}
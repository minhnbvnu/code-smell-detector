function tableNameExistLoaded (result) {
  return {
    type: LOAD_TABLE_NAME_EXIST_SUCCESS,
    payload: {
      result
    }
  }
}
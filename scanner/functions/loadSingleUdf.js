function loadSingleUdf (projectId, roleType, resolve, type) {
  return {
    type: LOAD_SINGLE_UDF,
    payload: {
      projectId,
      roleType,
      resolve,
      type
    }
  }
}
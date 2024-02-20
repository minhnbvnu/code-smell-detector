function deleteInstace (instanceId, resolve, reject) {
  return {
    type: DELETE_INSTANCE,
    payload: {
      instanceId,
      resolve,
      reject
    }
  }
}
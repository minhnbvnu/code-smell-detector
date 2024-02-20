function loadStreamNameValue (projectId, value, resolve, reject) {
  return {
    type: LOAD_STREAM_NAME_VALUE,
    payload: {
      projectId,
      value,
      resolve,
      reject
    }
  }
}
function loadProjectNameInputValue (value, resolve, reject) {
  return {
    type: LOAD_PROJECT_NAME_VALUE,
    payload: {
      value,
      resolve,
      reject
    }
  }
}
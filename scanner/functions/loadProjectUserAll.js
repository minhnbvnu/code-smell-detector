function loadProjectUserAll (resolve) {
  return {
    type: LOAD_PROJECT_USER_ALL,
    payload: {
      resolve
    }
  }
}
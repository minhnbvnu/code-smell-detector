function loadProjectNsAll (resolve) {
  return {
    type: LOAD_PROJECT_NS_ALL,
    payload: {
      resolve
    }
  }
}
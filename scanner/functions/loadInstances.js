function loadInstances (resolve) {
  return {
    type: LOAD_INSTANCES,
    payload: {
      resolve
    }
  }
}
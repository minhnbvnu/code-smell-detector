function instancesLoaded (instances) {
  return {
    type: LOAD_INSTANCES_SUCCESS,
    payload: {
      instances
    }
  }
}
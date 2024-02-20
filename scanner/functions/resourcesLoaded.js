function resourcesLoaded (resources) {
  return {
    type: LOAD_RESOURCES_SUCCESS,
    payload: {
      resources
    }
  }
}
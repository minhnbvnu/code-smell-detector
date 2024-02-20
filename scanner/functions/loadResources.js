function loadResources (projectId, roleType) {
  return {
    type: LOAD_RESOURCES,
    payload: {
      projectId,
      roleType
    }
  }
}
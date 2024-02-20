function loadPerformances (projectId, roleType) {
  return {
    type: LOAD_PERFORMANCES,
    payload: {
      projectId,
      roleType
    }
  }
}
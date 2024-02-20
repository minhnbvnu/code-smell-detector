function loadProjects (visible) {
  return {
    type: LOAD_PROJECTS,
    payload: {
      visible
    }
  }
}
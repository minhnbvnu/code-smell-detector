function projectsLoaded (projects) {
  return {
    type: LOAD_PROJECTS_SUCCESS,
    payload: {
      projects
    }
  }
}
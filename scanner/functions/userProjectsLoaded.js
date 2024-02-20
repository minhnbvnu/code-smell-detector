function userProjectsLoaded (projects) {
  return {
    type: LOAD_USER_PROJECTS_SUCCESS,
    payload: {
      projects
    }
  }
}
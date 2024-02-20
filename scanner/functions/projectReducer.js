function projectReducer (state = initialState, { type, payload }) {
  const projects = state.get('projects')
  switch (type) {
    case LOAD_PROJECTS:
      return state
    case LOAD_PROJECTS_SUCCESS:
      return state.set('projects', payload.projects)
    case LOAD_USER_PROJECTS:
      return state
    case LOAD_USER_PROJECTS_SUCCESS:
      return state.set('projects', payload.projects)
    case LOAD_SINGLE_PROJECT:
      return state
    case LOAD_SINGLE_PROJECT_SUCCESS:
      return state
    case ADD_PROJECT:
      return state.set('modalLoading', true)
    case ADD_PROJECT_SUCCESS:
      projects.unshift(payload.result)
      return state
        .set('projects', projects.slice())
        .set('modalLoading', false)
    case EDIT_PROJECT:
      return state.set('modalLoading', true)
    case EDIT_PROJECT_SUCCESS:
      const startIndexEdit = projects.indexOf(projects.find(p => Object.is(p.id, payload.result.id)))
      projects.fill(payload.result, startIndexEdit, startIndexEdit + 1)
      return state
        .set('projects', projects.slice())
        .set('modalLoading', false)
    case EDIT_PROJECT_ERROR:
      const startIndexEditError = projects.indexOf(projects.find(p => Object.is(p.id, payload.result.payload.id)))
      projects.fill(payload.result.payload, startIndexEditError, startIndexEditError + 1)
      return state
        .set('projects', projects.slice())
        .set('modalLoading', false)
    case LOAD_PROJECT_NAME_VALUE:
      return state.set('projectNameExited', false)
    case LOAD_PROJECT_NAME_VALUE_SUCCESS:
      return state.set('projectNameExited', false)
    case LOAD_PROJECT_NAME_VALUE_ERROR:
      return state.set('projectNameExited', true)
    case DELETE_SINGLE_PROJECT:
      return state
    case DELETE_SINGLE_PROJECT_SUCCESS:
      return state.set('projects', projects.filter(g => !Object.is(g.id, payload.result)))
    case DELETE_SINGLE_PROJECT_ERROR:
      return state
    case GET_ERROR:
      payload.final && payload.final()
      return state
    default:
      return state
  }
}
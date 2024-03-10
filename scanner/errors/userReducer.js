function userReducer (state = initialState, { type, payload }) {
  const users = state.get('users')
  switch (type) {
    case LOAD_ADMIN_ALL_USERS:
      return state.set('error', false)
    case LOAD_ADMIN_ALL_USERS_SUCCESS:
      return state.set('users', payload.users)
    case LOAD_USER_USERS:
      return state.set('error', false)
    case LOAD_USER_USERS_SUCCESS:
      return state.set('users', payload.users)
    case LOAD_SELECT_USERS:
      return state.set('error', false)
    case LOAD_NORMAL:
      return state.set('users', payload.users)
    case LOAD_NORMAL_SUCCESS:
      return state.set('error', false)
    case LOAD_SELECT_USERS_SUCCESS:
      return state.set('users', payload.users)
    case ADD_USER:
      return state
        .set('error', false)
        .set('modalLoading', true)
    case ADD_USER_SUCCESS:
      users.unshift(payload.result)
      return state
        .set('users', users.slice())
        .set('modalLoading', false)
    case EDIT_USER:
      return state
        .set('error', false)
        .set('modalLoading', true)
    case EDIT_USER_SUCCESS:
      const startIndex = users.indexOf(users.find(p => Object.is(p.id, payload.result.id)))
      users.fill(payload.result, startIndex, startIndex + 1)
      return state
        .set('users', users.slice())
        .set('modalLoading', false)
        .set('locale', payload.result.preferredLanguage)
    case EDIT_NORMAL:
      return state
    case EDIT_NORMAL_SUCCESS:
      return state
        .set('locale', payload.result.preferredLanguage)
    case LOAD_EMAIL_INPUT_VALUE:
      return state.set('emailExited', false)
    case LOAD_EMAIL_INPUT_VALUE_SUCCESS:
      return state.set('emailExited', false)
    case LOAD_EMAIL_INPUT_VALUE_ERROR:
      return state.set('emailExited', true)
    case EDIT_ROLETYPE_USERPSW:
      return state
        .set('error', false)
        .set('modalLoading', true)
    case EDIT_ROLETYPE_USERPSW_SUCCESS:
      return state.set('modalLoading', false)
    case EDIT_ROLETYPE_USERPSW_ERROR:
      return state.set('modalLoading', false)
    case LOAD_USER_DETAIL:
      return state
    case LOAD_USER_DETAIL_SUCCESS:
      return state

    case LOAD_PROJECT_USER_ALL:
      return state.set('error', false)
    case LOAD_PROJECT_USER_ALL_SUCCESS:
      return state.set('users', payload.result)
    case DELETE_USER:
      return state
    case DELETE_USER_SUCCESS:
      return state.set('users', users.filter(g => !Object.is(g.id, payload.result)))
    case DELETE_USER_ERROR:
      return state
    case GET_ERROR:
      return state.set('error', payload.error)
    default:
      return state
  }
}
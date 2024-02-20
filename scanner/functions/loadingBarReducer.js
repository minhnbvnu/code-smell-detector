function loadingBarReducer(state = {}, action = {}) {
  const { scope = DEFAULT_SCOPE } = (action.payload || {})

  switch (action.type) {
    case SHOW:
      return {
        ...state,
        [scope]: (state[scope] || 0) + 1,
      }
    case HIDE:
      return {
        ...state,
        [scope]: Math.max(0, (state[scope] || 1) - 1),
      }
    case RESET:
      return {
        ...state,
        [scope]: 0,
      }
    default:
      return state
  }
}
function requireAuth (nextState, replaceState) {
  const state = store.getState()
  const isLoggedIn = Boolean(state.application.token)
  if (!isLoggedIn)
    replaceState({
      nextPathname: nextState.location.pathname
    }, '/login')
}
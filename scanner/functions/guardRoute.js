function guardRoute (to, from, next) {
  // work-around to get to the Vuex store (as of Vue 2.0)
  const auth = router.app.$options.store.state.auth

  if (!auth.isLoggedIn) {
    next({path: '/login', query: { redirect: to.fullPath }})
  } else {
    next()
  }
}
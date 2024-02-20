function showLoading(scope = DEFAULT_SCOPE) {
  return {
    type: SHOW,
    payload: {
      scope,
    },
  }
}
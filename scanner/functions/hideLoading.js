function hideLoading(scope = DEFAULT_SCOPE) {
  return {
    type: HIDE,
    payload: {
      scope,
    },
  }
}
function resetLoading(scope = DEFAULT_SCOPE) {
  return {
    type: RESET,
    payload: {
      scope,
    },
  }
}
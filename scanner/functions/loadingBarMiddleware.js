function loadingBarMiddleware(config = {}) {
  const promiseTypeSuffixes = config.promiseTypeSuffixes || defaultTypeSuffixes
  const scope = config.scope || DEFAULT_SCOPE

  return ({ dispatch }) => (next) => (action) => {
    if (action.type) {
      const [PENDING, FULFILLED, REJECTED] = promiseTypeSuffixes

      const isPending = new RegExp(`${PENDING}$`, 'g')
      const isFulfilled = new RegExp(`${FULFILLED}$`, 'g')
      const isRejected = new RegExp(`${REJECTED}$`, 'g')

      const actionScope = (action.meta && action.meta.scope)
                          || action.scope
                          || scope

      if (action.type.match(isPending)) {
        dispatch(showLoading(actionScope))
      } else if (action.type.match(isFulfilled)
                 || action.type.match(isRejected)) {
        dispatch(hideLoading(actionScope))
      }
    }

    return next(action)
  }
}
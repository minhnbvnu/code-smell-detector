function systemThunkMiddleware(getSystem) {
                return function(_ref) {
                    var dispatch = _ref.dispatch,
                        getState = _ref.getState;
                    return function(next) {
                        return function(action) {
                            if (typeof action === "function") {
                                return action(getSystem())
                            }
                            return next(action)
                        }
                    }
                }
            }
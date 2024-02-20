function makeReducer(reducerObj) {
            return function() {
                var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _immutable.Map;
                var action = arguments[1];
                if (!reducerObj) return state;
                var redFn = reducerObj[action.type];
                if (redFn) {
                    var res = wrapWithTryCatch(redFn)(state, action);
                    return res === null ? state : res
                }
                return state
            }
        }
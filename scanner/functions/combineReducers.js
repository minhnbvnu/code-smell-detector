function combineReducers(reducers) {
                        var reducerKeys = Object.keys(reducers);
                        var finalReducers = {};
                        for (var i = 0; i < reducerKeys.length; i++) {
                            var key = reducerKeys[i];
                            if (false) { }
                            if (typeof reducers[key] === 'function') {
                                finalReducers[key] = reducers[key];
                            }
                        }
                        var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
                        // keys multiple times.
                        var unexpectedKeyCache;
                        if (false) { }
                        var shapeAssertionError;
                        try {
                            assertReducerShape(finalReducers);
                        }
                        catch (e) {
                            shapeAssertionError = e;
                        }
                        return function combination(state, action) {
                            if (state === void 0) {
                                state = {};
                            }
                            if (shapeAssertionError) {
                                throw shapeAssertionError;
                            }
                            if (false) {
                                var warningMessage;
                            }
                            var hasChanged = false;
                            var nextState = {};
                            for (var _i = 0; _i < finalReducerKeys.length; _i++) {
                                var _key = finalReducerKeys[_i];
                                var reducer = finalReducers[_key];
                                var previousStateForKey = state[_key];
                                var nextStateForKey = reducer(previousStateForKey, action);
                                if (typeof nextStateForKey === 'undefined') {
                                    var actionType = action && action.type;
                                    throw new Error(true ? formatProdErrorMessage(14) : 0);
                                }
                                nextState[_key] = nextStateForKey;
                                hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
                            }
                            hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
                            return hasChanged ? nextState : state;
                        };
                    }
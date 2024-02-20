function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
                        var reducerKeys = Object.keys(reducers);
                        var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';
                        if (reducerKeys.length === 0) {
                            return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
                        }
                        if (!isPlainObject(inputState)) {
                            return "The " + argumentName + " has unexpected type of \"" + kindOf(inputState) + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
                        }
                        var unexpectedKeys = Object.keys(inputState).filter(function (key) {
                            return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
                        });
                        unexpectedKeys.forEach(function (key) {
                            unexpectedKeyCache[key] = true;
                        });
                        if (action && action.type === ActionTypes.REPLACE)
                            return;
                        if (unexpectedKeys.length > 0) {
                            return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
                        }
                    }
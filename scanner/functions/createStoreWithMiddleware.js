function createStoreWithMiddleware(rootReducer, initialState, getSystem) {
            var middlwares = [(0, _utils.systemThunkMiddleware)(getSystem)];
            var composeEnhancers = _window2.default.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
            return (0, _redux.createStore)(rootReducer, initialState, composeEnhancers(_redux.applyMiddleware.apply(undefined, middlwares)))
        }
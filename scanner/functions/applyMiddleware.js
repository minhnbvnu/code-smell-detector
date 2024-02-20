function applyMiddleware() {
                        for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
                            middlewares[_key] = arguments[_key];
                        }
                        return function (createStore) {
                            return function () {
                                var store = createStore.apply(void 0, arguments);
                                var _dispatch = function dispatch() {
                                    throw new Error(true ? formatProdErrorMessage(15) : 0);
                                };
                                var middlewareAPI = {
                                    getState: store.getState,
                                    dispatch: function dispatch() {
                                        return _dispatch.apply(void 0, arguments);
                                    }
                                };
                                var chain = middlewares.map(function (middleware) {
                                    return middleware(middlewareAPI);
                                });
                                _dispatch = compose.apply(void 0, chain)(store.dispatch);
                                return _objectSpread2(_objectSpread2({}, store), {}, {
                                    dispatch: _dispatch
                                });
                            };
                        };
                    }
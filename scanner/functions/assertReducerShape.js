function assertReducerShape(reducers) {
                        Object.keys(reducers).forEach(function (key) {
                            var reducer = reducers[key];
                            var initialState = reducer(undefined, {
                                type: ActionTypes.INIT
                            });
                            if (typeof initialState === 'undefined') {
                                throw new Error(true ? formatProdErrorMessage(12) : 0);
                            }
                            if (typeof reducer(undefined, {
                                type: ActionTypes.PROBE_UNKNOWN_ACTION()
                            }) === 'undefined') {
                                throw new Error(true ? formatProdErrorMessage(13) : 0);
                            }
                        });
                    }
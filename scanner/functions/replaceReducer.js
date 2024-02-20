function replaceReducer(nextReducer) {
                            if (typeof nextReducer !== 'function') {
                                throw new Error(true ? formatProdErrorMessage(10) : 0);
                            }
                            currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
                            // Any reducers that existed in both the new and old rootReducer
                            // will receive the previous state. This effectively populates
                            // the new state tree with any relevant data from the old one.
                            dispatch({
                                type: ActionTypes.REPLACE
                            });
                        }
function bindActionCreators(actionCreators, dispatch) {
                        if (typeof actionCreators === 'function') {
                            return bindActionCreator(actionCreators, dispatch);
                        }
                        if (typeof actionCreators !== 'object' || actionCreators === null) {
                            throw new Error(true ? formatProdErrorMessage(16) : 0);
                        }
                        var boundActionCreators = {};
                        for (var key in actionCreators) {
                            var actionCreator = actionCreators[key];
                            if (typeof actionCreator === 'function') {
                                boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
                            }
                        }
                        return boundActionCreators;
                    }
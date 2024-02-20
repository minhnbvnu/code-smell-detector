function bindActionCreator(actionCreator, dispatch) {
                        return function () {
                            return dispatch(actionCreator.apply(this, arguments));
                        };
                    }
function buildReducer(states) {
            var reducerObj = (0, _utils.objMap)(states, function(val) {
                return val.reducers
            });
            return allReducers(reducerObj)
        }
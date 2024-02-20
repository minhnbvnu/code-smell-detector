function allReducers(reducerSystem) {
            var reducers = (0, _keys2.default)(reducerSystem).reduce(function(obj, key) {
                obj[key] = makeReducer(reducerSystem[key]);
                return obj
            }, {});
            if (!(0, _keys2.default)(reducers).length) {
                return idFn
            }
            return (0, _reduxImmutable.combineReducers)(reducers)
        }
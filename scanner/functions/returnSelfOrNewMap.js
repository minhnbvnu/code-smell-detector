function returnSelfOrNewMap(obj) {
            return _immutable.Map.isMap(obj) ? obj : new _immutable.Map
        }
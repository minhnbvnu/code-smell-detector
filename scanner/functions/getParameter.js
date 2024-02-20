function getParameter(state, pathMethod, name, inType) {
            pathMethod = pathMethod || [];
            var params = state.getIn(["meta", "paths"].concat((0, _toConsumableArray3.default)(pathMethod), ["parameters"]), (0, _immutable.fromJS)([]));
            return params.find(function(p) {
                return _immutable.Map.isMap(p) && p.get("name") === name && p.get("in") === inType
            }) || (0, _immutable.Map)()
        }
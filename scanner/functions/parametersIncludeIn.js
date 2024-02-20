function parametersIncludeIn(parameters) {
            var inValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
            if (_immutable.List.isList(parameters)) {
                return parameters.some(function(p) {
                    return _immutable.Map.isMap(p) && p.get("in") === inValue
                })
            }
        }
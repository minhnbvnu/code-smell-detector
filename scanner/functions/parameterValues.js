function parameterValues(state, pathMethod, isXml) {
            pathMethod = pathMethod || [];
            var paramValues = operationWithMeta.apply(undefined, [state].concat((0, _toConsumableArray3.default)(pathMethod))).get("parameters", (0, _immutable.List)());
            return paramValues.reduce(function(hash, p) {
                var value = isXml && p.get("in") === "body" ? p.get("value_xml") : p.get("value");
                return hash.set(p.get("in") + "." + p.get("name"), value)
            }, (0, _immutable.fromJS)({}))
        }
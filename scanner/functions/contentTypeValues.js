function contentTypeValues(state, pathMethod) {
            pathMethod = pathMethod || [];
            var op = specJsonWithResolvedSubtrees(state).getIn(["paths"].concat((0, _toConsumableArray3.default)(pathMethod)), (0, _immutable.fromJS)({}));
            var meta = state.getIn(["meta", "paths"].concat((0, _toConsumableArray3.default)(pathMethod)), (0, _immutable.fromJS)({}));
            var producesValue = currentProducesFor(state, pathMethod);
            var parameters = op.get("parameters") || new _immutable.List;
            var requestContentType = meta.get("consumes_value") ? meta.get("consumes_value") : parametersIncludeType(parameters, "file") ? "multipart/form-data" : parametersIncludeType(parameters, "formData") ? "application/x-www-form-urlencoded" : undefined;
            return (0, _immutable.fromJS)({
                requestContentType: requestContentType,
                responseContentType: producesValue
            })
        }
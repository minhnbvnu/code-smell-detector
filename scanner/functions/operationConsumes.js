function operationConsumes(state, pathMethod) {
            pathMethod = pathMethod || [];
            return specJsonWithResolvedSubtrees(state).getIn(["paths"].concat((0, _toConsumableArray3.default)(pathMethod), ["consumes"]), (0, _immutable.fromJS)({}))
        }
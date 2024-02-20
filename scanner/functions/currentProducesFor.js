function currentProducesFor(state, pathMethod) {
            pathMethod = pathMethod || [];
            var operation = specJsonWithResolvedSubtrees(state).getIn(["paths"].concat((0, _toConsumableArray3.default)(pathMethod)), null);
            if (operation === null) {
                return
            }
            var currentProducesValue = state.getIn(["meta", "paths"].concat((0, _toConsumableArray3.default)(pathMethod), ["produces_value"]), null);
            var firstProducesArrayItem = operation.getIn(["produces", 0], null);
            return currentProducesValue || firstProducesArrayItem || "application/json"
        }
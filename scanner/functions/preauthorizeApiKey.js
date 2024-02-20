function preauthorizeApiKey(system, key, value) {
            var authorize = system.authActions.authorize,
                _system$specSelectors2 = system.specSelectors,
                specJson = _system$specSelectors2.specJson,
                isOAS3 = _system$specSelectors2.isOAS3;
            var definitionBase = isOAS3() ? ["components", "securitySchemes"] : ["securityDefinitions"];
            var schema = specJson().getIn([].concat(definitionBase, [key]));
            if (!schema) {
                return null
            }
            return authorize((0, _defineProperty3.default)({}, key, {
                value: value,
                schema: schema.toJS()
            }))
        }
function preauthorizeBasic(system, key, username, password) {
            var authorize = system.authActions.authorize,
                _system$specSelectors = system.specSelectors,
                specJson = _system$specSelectors.specJson,
                isOAS3 = _system$specSelectors.isOAS3;
            var definitionBase = isOAS3() ? ["components", "securitySchemes"] : ["securityDefinitions"];
            var schema = specJson().getIn([].concat(definitionBase, [key]));
            if (!schema) {
                return null
            }
            return authorize((0, _defineProperty3.default)({}, key, {
                value: {
                    username: username,
                    password: password
                },
                schema: schema.toJS()
            }))
        }
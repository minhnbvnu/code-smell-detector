function setServerVariableValue(_ref4) {
            var server = _ref4.server,
                namespace = _ref4.namespace,
                key = _ref4.key,
                val = _ref4.val;
            return {
                type: UPDATE_SERVER_VARIABLE_VALUE,
                payload: {
                    server: server,
                    namespace: namespace,
                    key: key,
                    val: val
                }
            }
        }
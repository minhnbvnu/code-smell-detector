function createTailoredParameterError(err, jsSpec) {
            var newErrs = [];
            var parameter = (0, _get2.default)(jsSpec, err.get("path"));
            if (parameter.in && VALID_IN_VALUES.indexOf(parameter.in) === -1) {
                var message = 'Wrong value for the "in" keyword. Expected one of: ' + VALID_IN_VALUES.join(", ") + ".";
                newErrs.push({
                    message: message,
                    path: err.get("path") + ".in",
                    type: "spec",
                    source: "schema",
                    level: "error"
                })
            }
            if (parameter.collectionFormat && VALID_COLLECTIONFORMAT_VALUES.indexOf(parameter.collectionFormat) === -1) {
                var _message = 'Wrong value for the "collectionFormat" keyword. Expected one of: ' + VALID_COLLECTIONFORMAT_VALUES.join(", ") + ".";
                newErrs.push({
                    message: _message,
                    path: err.get("path") + ".collectionFormat",
                    type: "spec",
                    source: "schema",
                    level: "error"
                })
            }
            return newErrs.length ? (0, _immutable.fromJS)(newErrs) : err
        }
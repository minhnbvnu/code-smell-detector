function setRequestBodyValue(_ref) {
            var value = _ref.value,
                pathMethod = _ref.pathMethod;
            return {
                type: UPDATE_REQUEST_BODY_VALUE,
                payload: {
                    value: value,
                    pathMethod: pathMethod
                }
            }
        }
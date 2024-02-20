function setResponseContentType(_ref3) {
            var value = _ref3.value,
                path = _ref3.path,
                method = _ref3.method;
            return {
                type: UPDATE_RESPONSE_CONTENT_TYPE,
                payload: {
                    value: value,
                    path: path,
                    method: method
                }
            }
        }
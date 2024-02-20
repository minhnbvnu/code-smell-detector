function setRequestContentType(_ref2) {
            var value = _ref2.value,
                pathMethod = _ref2.pathMethod;
            return {
                type: UPDATE_REQUEST_CONTENT_TYPE,
                payload: {
                    value: value,
                    pathMethod: pathMethod
                }
            }
        }
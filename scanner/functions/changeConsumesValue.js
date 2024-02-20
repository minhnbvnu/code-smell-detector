function changeConsumesValue(path, value) {
            return {
                type: UPDATE_OPERATION_META_VALUE,
                payload: {
                    path: path,
                    value: value,
                    key: "consumes_value"
                }
            }
        }
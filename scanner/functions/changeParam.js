function changeParam(path, paramName, paramIn, value, isXml) {
            return {
                type: UPDATE_PARAM,
                payload: {
                    path: path,
                    value: value,
                    paramName: paramName,
                    paramIn: paramIn,
                    isXml: isXml
                }
            }
        }
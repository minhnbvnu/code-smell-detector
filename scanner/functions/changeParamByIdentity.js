function changeParamByIdentity(pathMethod, param, value, isXml) {
            return {
                type: UPDATE_PARAM,
                payload: {
                    path: pathMethod,
                    param: param,
                    value: value,
                    isXml: isXml
                }
            }
        }
function clearValidateParams(payload) {
            return {
                type: CLEAR_VALIDATE_PARAMS,
                payload: {
                    pathMethod: payload
                }
            }
        }
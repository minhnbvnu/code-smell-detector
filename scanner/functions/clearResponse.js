function clearResponse(path, method) {
            return {
                type: CLEAR_RESPONSE,
                payload: {
                    path: path,
                    method: method
                }
            }
        }
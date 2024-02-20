function clearRequest(path, method) {
            return {
                type: CLEAR_REQUEST,
                payload: {
                    path: path,
                    method: method
                }
            }
        }
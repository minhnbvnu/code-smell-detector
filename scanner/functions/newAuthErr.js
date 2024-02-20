function newAuthErr(err) {
            return {
                type: NEW_AUTH_ERR,
                payload: err
            }
        }
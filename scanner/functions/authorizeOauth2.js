function authorizeOauth2(payload) {
            return {
                type: AUTHORIZE_OAUTH2,
                payload: payload
            }
        }
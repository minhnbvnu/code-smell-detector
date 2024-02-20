function newThrownErr(err) {
            return {
                type: NEW_THROWN_ERR,
                payload: (0, _serializeError2.default)(err)
            }
        }
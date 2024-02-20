function newThrownErrBatch(errors) {
            return {
                type: NEW_THROWN_ERR_BATCH,
                payload: errors
            }
        }
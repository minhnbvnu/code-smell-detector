function logInternalError(logger, err) {
            if (logger) {
                logger.log("*INTERNAL ERROR* - Exception in typescript services: " + err.message);
            }
        }
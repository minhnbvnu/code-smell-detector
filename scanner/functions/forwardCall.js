function forwardCall(logger, actionDescription2, returnJson, action, logPerformance) {
            try {
                const result = simpleForwardCall(logger, actionDescription2, action, logPerformance);
                return returnJson ? JSON.stringify({ result }) : result;
            }
            catch (err) {
                if (err instanceof OperationCanceledException) {
                    return JSON.stringify({ canceled: true });
                }
                logInternalError(logger, err);
                err.description = actionDescription2;
                return JSON.stringify({ error: err });
            }
        }
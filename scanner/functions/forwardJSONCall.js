function forwardJSONCall(logger, actionDescription2, action, logPerformance) {
            return forwardCall(logger, actionDescription2, 
            /*returnJson*/
            true, action, logPerformance);
        }
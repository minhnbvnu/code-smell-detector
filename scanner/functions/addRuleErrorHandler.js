function addRuleErrorHandler(ruleListener) {
                return function ruleErrorHandler(...listenerArgs) {
                    try {
                        return ruleListener(...listenerArgs);
                    }
                    catch (e) {
                        e.ruleId = ruleId;
                        throw e;
                    }
                };
            }
function doOutsideOfYieldAndAwaitContext(func) {
                        return doOutsideOfContext(8192 /* YieldContext */ | 32768 /* AwaitContext */, func);
                    }
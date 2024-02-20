function doInYieldAndAwaitContext(func) {
                        return doInsideOfContext(8192 /* YieldContext */ | 32768 /* AwaitContext */, func);
                    }
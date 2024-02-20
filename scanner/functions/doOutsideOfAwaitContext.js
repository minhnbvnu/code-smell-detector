function doOutsideOfAwaitContext(func) {
                        return doOutsideOfContext(32768 /* AwaitContext */, func);
                    }
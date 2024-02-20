function doInAwaitContext(func) {
                        return doInsideOfContext(32768 /* AwaitContext */, func);
                    }
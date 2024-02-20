function runWithCancellationToken(func) {
                try {
                    return func();
                }
                catch (e) {
                    if (e instanceof OperationCanceledException) {
                        typeChecker = void 0;
                    }
                    throw e;
                }
            }
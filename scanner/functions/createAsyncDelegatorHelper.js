function createAsyncDelegatorHelper(expression) {
                context.requestEmitHelper(awaitHelper);
                context.requestEmitHelper(asyncDelegator);
                return factory2.createCallExpression(getUnscopedHelperName("__asyncDelegator"), 
                /*typeArguments*/
                void 0, [expression]);
            }
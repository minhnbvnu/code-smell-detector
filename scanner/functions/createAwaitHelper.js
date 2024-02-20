function createAwaitHelper(expression) {
                context.requestEmitHelper(awaitHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__await"), 
                /*typeArguments*/
                void 0, [expression]);
            }
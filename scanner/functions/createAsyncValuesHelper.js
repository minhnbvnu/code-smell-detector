function createAsyncValuesHelper(expression) {
                context.requestEmitHelper(asyncValues);
                return factory2.createCallExpression(getUnscopedHelperName("__asyncValues"), 
                /*typeArguments*/
                void 0, [expression]);
            }
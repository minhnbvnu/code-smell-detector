function createValuesHelper(expression) {
                context.requestEmitHelper(valuesHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__values"), 
                /*typeArguments*/
                void 0, [expression]);
            }
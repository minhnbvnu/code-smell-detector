function createSetFunctionNameHelper(f, name, prefix) {
                context.requestEmitHelper(setFunctionNameHelper);
                return context.factory.createCallExpression(getUnscopedHelperName("__setFunctionName"), 
                /*typeArguments*/
                void 0, prefix ? [f, name, context.factory.createStringLiteral(prefix)] : [f, name]);
            }
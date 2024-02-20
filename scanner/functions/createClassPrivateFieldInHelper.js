function createClassPrivateFieldInHelper(state, receiver) {
                context.requestEmitHelper(classPrivateFieldInHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__classPrivateFieldIn"), 
                /* typeArguments*/
                void 0, [state, receiver]);
            }
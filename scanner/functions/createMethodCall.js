function createMethodCall(object, methodName, argumentsList) {
                if (isCallChain(object)) {
                    return createCallChain(createPropertyAccessChain(object, 
                    /*questionDotToken*/
                    void 0, methodName), 
                    /*questionDotToken*/
                    void 0, 
                    /*typeArguments*/
                    void 0, argumentsList);
                }
                return createCallExpression(createPropertyAccessExpression(object, methodName), 
                /*typeArguments*/
                void 0, argumentsList);
            }
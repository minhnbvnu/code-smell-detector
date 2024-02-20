function createGlobalMethodCall(globalObjectName, methodName, argumentsList) {
                return createMethodCall(createIdentifier(globalObjectName), methodName, argumentsList);
            }
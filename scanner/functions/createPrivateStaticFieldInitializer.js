function createPrivateStaticFieldInitializer(variableName, initializer) {
            return factory.createAssignment(variableName, factory.createObjectLiteralExpression([
                factory.createPropertyAssignment("value", initializer || factory.createVoidZero())
            ]));
        }
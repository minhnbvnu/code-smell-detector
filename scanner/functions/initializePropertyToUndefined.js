function initializePropertyToUndefined(obj, propertyName) {
            return factory.createExpressionStatement(factory.createAssignment(factory.createPropertyAccessExpression(obj, propertyName), createUndefined()));
        }
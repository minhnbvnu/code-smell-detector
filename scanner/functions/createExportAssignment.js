function createExportAssignment(name) {
            return factory.createExpressionStatement(factory.createBinaryExpression(factory.createPropertyAccessExpression(factory.createIdentifier("exports"), factory.createIdentifier(name)), 63 /* EqualsToken */, factory.createIdentifier(name)));
        }
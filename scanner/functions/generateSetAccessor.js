function generateSetAccessor(fieldName, accessorName, type, modifiers, isStatic2, container) {
            return factory.createSetAccessorDeclaration(modifiers, accessorName, [factory.createParameterDeclaration(
                /*modifiers*/
                void 0, 
                /*dotDotDotToken*/
                void 0, factory.createIdentifier("value"), 
                /*questionToken*/
                void 0, type)], factory.createBlock([
                factory.createExpressionStatement(factory.createAssignment(createAccessorAccessExpression(fieldName, isStatic2, container), factory.createIdentifier("value")))
            ], 
            /*multiLine*/
            true));
        }
function generateGetAccessor(fieldName, accessorName, type, modifiers, isStatic2, container) {
            return factory.createGetAccessorDeclaration(modifiers, accessorName, [], type, factory.createBlock([
                factory.createReturnStatement(createAccessorAccessExpression(fieldName, isStatic2, container))
            ], 
            /*multiLine*/
            true));
        }
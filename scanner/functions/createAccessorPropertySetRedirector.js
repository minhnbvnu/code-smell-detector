function createAccessorPropertySetRedirector(factory2, node, modifiers, name) {
            return factory2.createSetAccessorDeclaration(modifiers, name, [factory2.createParameterDeclaration(
                /*modifiers*/
                void 0, 
                /*dotdotDotToken*/
                void 0, "value")], factory2.createBlock([
                factory2.createExpressionStatement(factory2.createAssignment(factory2.createPropertyAccessExpression(factory2.createThis(), factory2.getGeneratedPrivateNameForNode(node.name, 
                /*prefix*/
                void 0, "_accessor_storage")), factory2.createIdentifier("value")))
            ]));
        }
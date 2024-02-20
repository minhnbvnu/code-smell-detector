function createAccessorPropertyGetRedirector(factory2, node, modifiers, name) {
            return factory2.createGetAccessorDeclaration(modifiers, name, [], 
            /*type*/
            void 0, factory2.createBlock([
                factory2.createReturnStatement(factory2.createPropertyAccessExpression(factory2.createThis(), factory2.getGeneratedPrivateNameForNode(node.name, 
                /*prefix*/
                void 0, "_accessor_storage")))
            ]));
        }
function updateNamespaceLikeImportNode(node, newNamespaceName, newModuleSpecifier) {
            const newNamespaceId = factory.createIdentifier(newNamespaceName);
            const newModuleString = factory.createStringLiteral(newModuleSpecifier);
            switch (node.kind) {
                case 269 /* ImportDeclaration */:
                    return factory.createImportDeclaration(
                    /*modifiers*/
                    void 0, factory.createImportClause(
                    /*isTypeOnly*/
                    false, 
                    /*name*/
                    void 0, factory.createNamespaceImport(newNamespaceId)), newModuleString, 
                    /*assertClause*/
                    void 0);
                case 268 /* ImportEqualsDeclaration */:
                    return factory.createImportEqualsDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*isTypeOnly*/
                    false, newNamespaceId, factory.createExternalModuleReference(newModuleString));
                case 257 /* VariableDeclaration */:
                    return factory.createVariableDeclaration(newNamespaceId, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, createRequireCall(newModuleString));
                default:
                    return Debug.assertNever(node, `Unexpected node kind ${node.kind}`);
            }
        }
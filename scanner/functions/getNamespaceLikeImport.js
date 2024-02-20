function getNamespaceLikeImport(node) {
            switch (node.kind) {
                case 269 /* ImportDeclaration */:
                    return node.importClause && node.importClause.namedBindings && node.importClause.namedBindings.kind === 271 /* NamespaceImport */ ? node.importClause.namedBindings.name : void 0;
                case 268 /* ImportEqualsDeclaration */:
                    return node.name;
                case 257 /* VariableDeclaration */:
                    return tryCast(node.name, isIdentifier);
                default:
                    return Debug.assertNever(node, `Unexpected node kind ${node.kind}`);
            }
        }
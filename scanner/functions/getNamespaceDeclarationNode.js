function getNamespaceDeclarationNode(node) {
            switch (node.kind) {
                case 269 /* ImportDeclaration */:
                    return node.importClause && tryCast(node.importClause.namedBindings, isNamespaceImport);
                case 268 /* ImportEqualsDeclaration */:
                    return node;
                case 275 /* ExportDeclaration */:
                    return node.exportClause && tryCast(node.exportClause, isNamespaceExport);
                default:
                    return Debug.assertNever(node);
            }
        }
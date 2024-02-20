function visitImportDeclaration(node) {
                let statements;
                if (node.importClause) {
                    hoistVariableDeclaration(getLocalNameForExternalImport(factory2, node, currentSourceFile));
                }
                if (hasAssociatedEndOfDeclarationMarker(node)) {
                    const id = getOriginalNodeId(node);
                    deferredExports[id] = appendExportsOfImportDeclaration(deferredExports[id], node);
                }
                else {
                    statements = appendExportsOfImportDeclaration(statements, node);
                }
                return singleOrMany(statements);
            }
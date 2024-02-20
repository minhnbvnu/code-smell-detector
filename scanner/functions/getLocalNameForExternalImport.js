function getLocalNameForExternalImport(factory2, node, sourceFile) {
            const namespaceDeclaration = getNamespaceDeclarationNode(node);
            if (namespaceDeclaration && !isDefaultImport(node) && !isExportNamespaceAsDefaultDeclaration(node)) {
                const name = namespaceDeclaration.name;
                return isGeneratedIdentifier(name) ? name : factory2.createIdentifier(getSourceTextOfNodeFromSourceFile(sourceFile, name) || idText(name));
            }
            if (node.kind === 269 /* ImportDeclaration */ && node.importClause) {
                return factory2.getGeneratedNameForNode(node);
            }
            if (node.kind === 275 /* ExportDeclaration */ && node.moduleSpecifier) {
                return factory2.getGeneratedNameForNode(node);
            }
            return void 0;
        }
function getAdjustedLocationForExportDeclaration(node, forRename) {
            if (node.exportClause) {
                if (isNamedExports(node.exportClause)) {
                    const onlyBinding = singleOrUndefined(node.exportClause.elements);
                    if (!onlyBinding) {
                        return;
                    }
                    return node.exportClause.elements[0].name;
                }
                else if (isNamespaceExport(node.exportClause)) {
                    return node.exportClause.name;
                }
            }
            if (!forRename) {
                return node.moduleSpecifier;
            }
        }
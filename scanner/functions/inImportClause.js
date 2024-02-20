function inImportClause(node) {
            const parent2 = node.parent;
            return parent2 && (isImportClause(parent2) || isImportSpecifier(parent2) || isNamespaceImport(parent2));
        }
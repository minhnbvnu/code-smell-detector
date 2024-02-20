function getImportNeedsImportDefaultHelper(node) {
            return !getImportNeedsImportStarHelper(node) && (isDefaultImport(node) || !!node.importClause && isNamedImports(node.importClause.namedBindings) && containsDefaultReference(node.importClause.namedBindings));
        }
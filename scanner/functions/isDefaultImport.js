function isDefaultImport(node) {
            return node.kind === 269 /* ImportDeclaration */ && !!node.importClause && !!node.importClause.name;
        }
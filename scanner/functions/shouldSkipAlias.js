function shouldSkipAlias(node, declaration) {
            if (node.kind !== 79 /* Identifier */) {
                return false;
            }
            if (node.parent === declaration) {
                return true;
            }
            if (declaration.kind === 271 /* NamespaceImport */) {
                return false;
            }
            return true;
        }
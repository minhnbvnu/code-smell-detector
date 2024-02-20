function getImportNeedsImportStarHelper(node) {
            if (!!getNamespaceDeclarationNode(node)) {
                return true;
            }
            const bindings = node.importClause && node.importClause.namedBindings;
            if (!bindings) {
                return false;
            }
            if (!isNamedImports(bindings))
                return false;
            let defaultRefCount = 0;
            for (const binding of bindings.elements) {
                if (isNamedDefaultReference(binding)) {
                    defaultRefCount++;
                }
            }
            return defaultRefCount > 0 && defaultRefCount !== bindings.elements.length || !!(bindings.elements.length - defaultRefCount) && isDefaultImport(node);
        }
function forEachImportClauseDeclaration(node, action) {
            if (node.name) {
                const result = action(node);
                if (result)
                    return result;
            }
            if (node.namedBindings) {
                const result = isNamespaceImport(node.namedBindings) ? action(node.namedBindings) : forEach(node.namedBindings.elements, action);
                if (result)
                    return result;
            }
        }
function containsDefaultReference(node) {
            if (!node)
                return false;
            if (!isNamedImports(node))
                return false;
            return some(node.elements, isNamedDefaultReference);
        }
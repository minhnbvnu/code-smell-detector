function visitPropertyName(node) {
                if (isComputedPropertyName(node)) {
                    return visitComputedPropertyName(node);
                }
                return visitNode(node, visitor, isPropertyName);
            }
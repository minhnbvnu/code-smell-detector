function visitComputedPropertyName(node) {
                return visitEachChild(node, visitor, context);
            }
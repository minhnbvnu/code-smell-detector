function tryGetConstraintType(checker, node) {
            if (isTypeNode(node.parent)) {
                return checker.getTypeArgumentConstraint(node.parent);
            }
            const contextualType = isExpression(node) ? checker.getContextualType(node) : void 0;
            return contextualType || checker.getTypeAtLocation(node);
        }
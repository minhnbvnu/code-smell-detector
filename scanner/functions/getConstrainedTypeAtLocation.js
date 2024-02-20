function getConstrainedTypeAtLocation(checker, node) {
        const nodeType = checker.getTypeAtLocation(node);
        const constrained = checker.getBaseConstraintOfType(nodeType);
        return constrained !== null && constrained !== void 0 ? constrained : nodeType;
    }
function getIdentifiersFromPattern(pattern) {
        const identifiers = [];
        const visitor = new scope_manager_1.PatternVisitor({}, pattern, id => identifiers.push(id));
        visitor.visit(pattern);
        return identifiers;
    }
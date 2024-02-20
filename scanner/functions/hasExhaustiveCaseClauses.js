function hasExhaustiveCaseClauses(node, checker) {
        const caseClauses = node.caseBlock.clauses.filter(node_1.isCaseClause);
        if (caseClauses.length === 0)
            return false;
        const typeParts = type_1.unionTypeParts(checker.getTypeAtLocation(node.expression));
        if (typeParts.length > caseClauses.length)
            return false;
        const types = new Set(typeParts.map(getPrimitiveLiteralFromType));
        if (types.has(undefined))
            return false;
        const seen = new Set();
        for (const clause of caseClauses) {
            const expressionType = checker.getTypeAtLocation(clause.expression);
            if (exports.isTypeFlagSet(expressionType, ts.TypeFlags.Never))
                continue; // additional case clause with 'never' is always allowed
            const type = getPrimitiveLiteralFromType(expressionType);
            if (types.has(type)) {
                seen.add(type);
            }
            else if (type !== 'null' && type !== 'undefined') { // additional case clauses with 'null' and 'undefined' are always allowed
                return false;
            }
        }
        return types.size === seen.size;
    }
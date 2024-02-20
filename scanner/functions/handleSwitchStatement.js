function handleSwitchStatement(node, checker) {
        let hasDefault = false;
        const result = {
            statements: [],
            end: false,
        };
        for (const clause of node.caseBlock.clauses) {
            if (clause.kind === ts.SyntaxKind.DefaultClause)
                hasDefault = true;
            const current = handleBlock(clause, checker);
            result.end = current.end;
            result.statements.push(...current.statements);
        }
        result.end && (result.end = hasDefault || checker !== undefined && util_1.hasExhaustiveCaseClauses(node, checker));
        return result;
    }
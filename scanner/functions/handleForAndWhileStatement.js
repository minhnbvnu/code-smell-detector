function handleForAndWhileStatement(statement, checker) {
        const constantCondition = statement.kind === ts.SyntaxKind.WhileStatement
            ? getConstantCondition(statement.expression)
            : statement.condition === undefined || getConstantCondition(statement.condition);
        if (constantCondition === false)
            return defaultControlFlowEnd; // loop body is never executed
        const end = matchBreakOrContinue(getControlFlowEndWorker(statement.statement, checker), node_1.isBreakOrContinueStatement);
        if (constantCondition === undefined)
            end.end = false; // can't be sure that loop body is executed at all
        return end;
    }
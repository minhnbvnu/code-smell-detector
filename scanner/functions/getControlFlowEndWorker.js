function getControlFlowEndWorker(statement, checker) {
        switch (statement.kind) {
            case ts.SyntaxKind.ReturnStatement:
            case ts.SyntaxKind.ThrowStatement:
            case ts.SyntaxKind.ContinueStatement:
            case ts.SyntaxKind.BreakStatement:
                return { statements: [statement], end: true };
            case ts.SyntaxKind.Block:
                return handleBlock(statement, checker);
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.WhileStatement:
                return handleForAndWhileStatement(statement, checker);
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.ForInStatement:
                return handleForInOrOfStatement(statement, checker);
            case ts.SyntaxKind.DoStatement:
                return matchBreakOrContinue(getControlFlowEndWorker(statement.statement, checker), node_1.isBreakOrContinueStatement);
            case ts.SyntaxKind.IfStatement:
                return handleIfStatement(statement, checker);
            case ts.SyntaxKind.SwitchStatement:
                return matchBreakOrContinue(handleSwitchStatement(statement, checker), node_1.isBreakStatement);
            case ts.SyntaxKind.TryStatement:
                return handleTryStatement(statement, checker);
            case ts.SyntaxKind.LabeledStatement:
                return matchLabel(getControlFlowEndWorker(statement.statement, checker), statement.label);
            case ts.SyntaxKind.WithStatement:
                return getControlFlowEndWorker(statement.statement, checker);
            case ts.SyntaxKind.ExpressionStatement:
                if (checker === undefined)
                    return defaultControlFlowEnd;
                return handleExpressionStatement(statement, checker);
            default:
                return defaultControlFlowEnd;
        }
    }
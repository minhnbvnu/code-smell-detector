function isInSingleStatementContext(statement) {
        switch (statement.parent.kind) {
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.WhileStatement:
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.WithStatement:
            case ts.SyntaxKind.LabeledStatement:
                return true;
            default:
                return false;
        }
    }
function forEachReturnStatement(body, visitor) {
        return traverse(body);
        function traverse(node) {
            switch (node.kind) {
                case ts.SyntaxKind.ReturnStatement:
                    return visitor(node);
                case ts.SyntaxKind.CaseBlock:
                case ts.SyntaxKind.Block:
                case ts.SyntaxKind.IfStatement:
                case ts.SyntaxKind.DoStatement:
                case ts.SyntaxKind.WhileStatement:
                case ts.SyntaxKind.ForStatement:
                case ts.SyntaxKind.ForInStatement:
                case ts.SyntaxKind.ForOfStatement:
                case ts.SyntaxKind.WithStatement:
                case ts.SyntaxKind.SwitchStatement:
                case ts.SyntaxKind.CaseClause:
                case ts.SyntaxKind.DefaultClause:
                case ts.SyntaxKind.LabeledStatement:
                case ts.SyntaxKind.TryStatement:
                case ts.SyntaxKind.CatchClause:
                    return ts.forEachChild(node, traverse);
            }
            return undefined;
        }
    }
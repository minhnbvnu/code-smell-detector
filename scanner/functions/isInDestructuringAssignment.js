function isInDestructuringAssignment(node) {
        switch (node.kind) {
            case ts.SyntaxKind.ShorthandPropertyAssignment:
                if (node.objectAssignmentInitializer !== undefined)
                    return true;
            // falls through
            case ts.SyntaxKind.PropertyAssignment:
            case ts.SyntaxKind.SpreadAssignment:
                node = node.parent;
                break;
            case ts.SyntaxKind.SpreadElement:
                if (node.parent.kind !== ts.SyntaxKind.ArrayLiteralExpression)
                    return false;
                node = node.parent;
        }
        while (true) {
            switch (node.parent.kind) {
                case ts.SyntaxKind.BinaryExpression:
                    return node.parent.left === node &&
                        node.parent.operatorToken.kind === ts.SyntaxKind.EqualsToken;
                case ts.SyntaxKind.ForOfStatement:
                    return node.parent.initializer === node;
                case ts.SyntaxKind.ArrayLiteralExpression:
                case ts.SyntaxKind.ObjectLiteralExpression:
                    node = node.parent;
                    break;
                case ts.SyntaxKind.SpreadAssignment:
                case ts.SyntaxKind.PropertyAssignment:
                    node = node.parent.parent;
                    break;
                case ts.SyntaxKind.SpreadElement:
                    if (node.parent.parent.kind !== ts.SyntaxKind.ArrayLiteralExpression)
                        return false;
                    node = node.parent.parent;
                    break;
                default:
                    return false;
            }
        }
    }
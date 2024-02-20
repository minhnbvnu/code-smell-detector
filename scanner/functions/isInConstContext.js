function isInConstContext(node) {
        let current = node;
        while (true) {
            const parent = current.parent;
            outer: switch (parent.kind) {
                case ts.SyntaxKind.TypeAssertionExpression:
                case ts.SyntaxKind.AsExpression:
                    return isConstAssertion(parent);
                case ts.SyntaxKind.PrefixUnaryExpression:
                    if (current.kind !== ts.SyntaxKind.NumericLiteral)
                        return false;
                    switch (parent.operator) {
                        case ts.SyntaxKind.PlusToken:
                        case ts.SyntaxKind.MinusToken:
                            current = parent;
                            break outer;
                        default:
                            return false;
                    }
                case ts.SyntaxKind.PropertyAssignment:
                    if (parent.initializer !== current)
                        return false;
                    current = parent.parent;
                    break;
                case ts.SyntaxKind.ShorthandPropertyAssignment:
                    current = parent.parent;
                    break;
                case ts.SyntaxKind.ParenthesizedExpression:
                case ts.SyntaxKind.ArrayLiteralExpression:
                case ts.SyntaxKind.ObjectLiteralExpression:
                case ts.SyntaxKind.TemplateExpression:
                    current = parent;
                    break;
                default:
                    return false;
            }
        }
    }
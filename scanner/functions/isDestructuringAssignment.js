function isDestructuringAssignment(node) {
                let current = node.parent;
                while (current) {
                    const parent = current.parent;
                    if (ts.isObjectLiteralExpression(parent) ||
                        ts.isArrayLiteralExpression(parent) ||
                        ts.isSpreadAssignment(parent) ||
                        (ts.isSpreadElement(parent) &&
                            ts.isArrayLiteralExpression(parent.parent))) {
                        current = parent;
                    }
                    else if (ts.isBinaryExpression(parent) &&
                        !ts.isPropertyAccessExpression(current)) {
                        return (parent.left === current &&
                            parent.operatorToken.kind === ts.SyntaxKind.EqualsToken);
                    }
                    else {
                        break;
                    }
                }
                return false;
            }
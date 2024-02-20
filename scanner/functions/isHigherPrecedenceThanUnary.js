function isHigherPrecedenceThanUnary(node) {
                const operator = tsutils.isBinaryExpression(node)
                    ? node.operatorToken.kind
                    : ts.SyntaxKind.Unknown;
                const nodePrecedence = util.getOperatorPrecedence(node.kind, operator);
                return nodePrecedence > util_1.OperatorPrecedence.Unary;
            }
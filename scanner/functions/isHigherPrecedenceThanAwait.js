function isHigherPrecedenceThanAwait(node) {
                const operator = (0, tsutils_1.isBinaryExpression)(node)
                    ? node.operatorToken.kind
                    : ts.SyntaxKind.Unknown;
                const nodePrecedence = (0, getOperatorPrecedence_1.getOperatorPrecedence)(node.kind, operator);
                const awaitPrecedence = (0, getOperatorPrecedence_1.getOperatorPrecedence)(ts.SyntaxKind.AwaitExpression, ts.SyntaxKind.Unknown);
                return nodePrecedence > awaitPrecedence;
            }
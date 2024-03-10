function checkBinaryLogical(node) {
                const prec = precedence(node);
                const leftPrecedence = precedence(node.left);
                const rightPrecedence = precedence(node.right);
                const isExponentiation = node.operator === "**";
                const shouldSkipLeft = NESTED_BINARY && (node.left.type === "BinaryExpression" || node.left.type === "LogicalExpression");
                const shouldSkipRight = NESTED_BINARY && (node.right.type === "BinaryExpression" || node.right.type === "LogicalExpression");
                if (!shouldSkipLeft && hasExcessParens(node.left)) {
                    if (!(["AwaitExpression", "UnaryExpression"].includes(node.left.type) && isExponentiation) &&
                        !astUtils.isMixedLogicalAndCoalesceExpressions(node.left, node) &&
                        (leftPrecedence > prec || (leftPrecedence === prec && !isExponentiation)) ||
                        isParenthesisedTwice(node.left)) {
                        report(node.left);
                    }
                }
                if (!shouldSkipRight && hasExcessParens(node.right)) {
                    if (!astUtils.isMixedLogicalAndCoalesceExpressions(node.right, node) &&
                        (rightPrecedence > prec || (rightPrecedence === prec && isExponentiation)) ||
                        isParenthesisedTwice(node.right)) {
                        report(node.right);
                    }
                }
            }
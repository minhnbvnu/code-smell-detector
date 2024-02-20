function isTopLevelLogicalExpression(node) {
                while (isParenthesizedExpression(node.parent) || isPrefixUnaryExpression(node.parent) && node.parent.operator === 53 /* ExclamationToken */) {
                    node = node.parent;
                }
                return !isStatementCondition(node) && !isLogicalExpression(node.parent) && !(isOptionalChain(node.parent) && node.parent.expression === node);
            }
function parenthesizeExpressionForNoAsi(node) {
                if (!commentsDisabled && isPartiallyEmittedExpression(node) && willEmitLeadingNewLine(node)) {
                    const parseNode = getParseTreeNode(node);
                    if (parseNode && isParenthesizedExpression(parseNode)) {
                        const parens = factory.createParenthesizedExpression(node.expression);
                        setOriginalNode(parens, node);
                        setTextRange(parens, parseNode);
                        return parens;
                    }
                    return factory.createParenthesizedExpression(node);
                }
                return node;
            }
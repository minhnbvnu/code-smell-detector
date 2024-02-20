function createDeleteExpression(expression) {
                const node = createBaseNode(217 /* DeleteExpression */);
                node.expression = parenthesizerRules().parenthesizeOperandOfPrefixUnary(expression);
                node.transformFlags |= propagateChildFlags(node.expression);
                return node;
            }
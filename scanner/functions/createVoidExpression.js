function createVoidExpression(expression) {
                const node = createBaseNode(219 /* VoidExpression */);
                node.expression = parenthesizerRules().parenthesizeOperandOfPrefixUnary(expression);
                node.transformFlags |= propagateChildFlags(node.expression);
                return node;
            }
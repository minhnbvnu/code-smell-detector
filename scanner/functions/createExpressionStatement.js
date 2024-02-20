function createExpressionStatement(expression) {
                const node = createBaseNode(241 /* ExpressionStatement */);
                node.expression = parenthesizerRules().parenthesizeExpressionOfExpressionStatement(expression);
                node.transformFlags |= propagateChildFlags(node.expression);
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }
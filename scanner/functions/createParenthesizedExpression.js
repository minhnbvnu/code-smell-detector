function createParenthesizedExpression(expression) {
                const node = createBaseNode(214 /* ParenthesizedExpression */);
                node.expression = expression;
                node.transformFlags = propagateChildFlags(node.expression);
                node.jsDoc = void 0;
                return node;
            }
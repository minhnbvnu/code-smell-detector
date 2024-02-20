function createThrowStatement(expression) {
                const node = createBaseNode(254 /* ThrowStatement */);
                node.expression = expression;
                node.transformFlags |= propagateChildFlags(node.expression);
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }
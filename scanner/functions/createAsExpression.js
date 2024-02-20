function createAsExpression(expression, type) {
                const node = createBaseNode(231 /* AsExpression */);
                node.expression = expression;
                node.type = type;
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildFlags(node.type) | 1 /* ContainsTypeScript */;
                return node;
            }
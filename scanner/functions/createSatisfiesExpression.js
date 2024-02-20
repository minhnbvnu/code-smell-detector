function createSatisfiesExpression(expression, type) {
                const node = createBaseNode(235 /* SatisfiesExpression */);
                node.expression = expression;
                node.type = type;
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildFlags(node.type) | 1 /* ContainsTypeScript */;
                return node;
            }
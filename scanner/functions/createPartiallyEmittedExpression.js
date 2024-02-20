function createPartiallyEmittedExpression(expression, original) {
                const node = createBaseNode(356 /* PartiallyEmittedExpression */);
                node.expression = expression;
                node.original = original;
                node.transformFlags |= propagateChildFlags(node.expression) | 1 /* ContainsTypeScript */;
                setTextRange(node, original);
                return node;
            }
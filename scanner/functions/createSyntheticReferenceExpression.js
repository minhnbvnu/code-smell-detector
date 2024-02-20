function createSyntheticReferenceExpression(expression, thisArg) {
                const node = createBaseNode(360 /* SyntheticReferenceExpression */);
                node.expression = expression;
                node.thisArg = thisArg;
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildFlags(node.thisArg);
                return node;
            }
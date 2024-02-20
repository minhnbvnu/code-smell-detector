function createTypeAssertion(type, expression) {
                const node = createBaseNode(213 /* TypeAssertionExpression */);
                node.expression = parenthesizerRules().parenthesizeOperandOfPrefixUnary(expression);
                node.type = type;
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildFlags(node.type) | 1 /* ContainsTypeScript */;
                return node;
            }
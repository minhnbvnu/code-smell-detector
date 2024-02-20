function createNonNullExpression(expression) {
                const node = createBaseNode(232 /* NonNullExpression */);
                node.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, 
                /*optionalChain*/
                false);
                node.transformFlags |= propagateChildFlags(node.expression) | 1 /* ContainsTypeScript */;
                return node;
            }
function createNonNullChain(expression) {
                const node = createBaseNode(232 /* NonNullExpression */);
                node.flags |= 32 /* OptionalChain */;
                node.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, 
                /*optionalChain*/
                true);
                node.transformFlags |= propagateChildFlags(node.expression) | 1 /* ContainsTypeScript */;
                return node;
            }
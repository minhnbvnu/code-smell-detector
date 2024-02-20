function createPropertyAccessChain(expression, questionDotToken, name) {
                const node = createBasePropertyAccessExpression(parenthesizerRules().parenthesizeLeftSideOfAccess(expression, 
                /*optionalChain*/
                true), questionDotToken, asName(name));
                node.flags |= 32 /* OptionalChain */;
                node.transformFlags |= 32 /* ContainsES2020 */;
                return node;
            }
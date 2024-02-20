function createElementAccessChain(expression, questionDotToken, index) {
                const node = createBaseElementAccessExpression(parenthesizerRules().parenthesizeLeftSideOfAccess(expression, 
                /*optionalChain*/
                true), questionDotToken, asExpression(index));
                node.flags |= 32 /* OptionalChain */;
                node.transformFlags |= 32 /* ContainsES2020 */;
                return node;
            }
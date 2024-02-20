function createElementAccessExpression(expression, index) {
                const node = createBaseElementAccessExpression(parenthesizerRules().parenthesizeLeftSideOfAccess(expression, 
                /*optionalChain*/
                false), 
                /*questionDotToken*/
                void 0, asExpression(index));
                if (isSuperKeyword(expression)) {
                    node.transformFlags |= 256 /* ContainsES2017 */ | 128 /* ContainsES2018 */;
                }
                return node;
            }
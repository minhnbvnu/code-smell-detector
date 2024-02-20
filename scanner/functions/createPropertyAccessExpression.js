function createPropertyAccessExpression(expression, name) {
                const node = createBasePropertyAccessExpression(parenthesizerRules().parenthesizeLeftSideOfAccess(expression, 
                /*optionalChain*/
                false), 
                /*questionDotToken*/
                void 0, asName(name));
                if (isSuperKeyword(expression)) {
                    node.transformFlags |= 256 /* ContainsES2017 */ | 128 /* ContainsES2018 */;
                }
                return node;
            }
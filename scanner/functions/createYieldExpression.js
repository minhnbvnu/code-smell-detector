function createYieldExpression(asteriskToken, expression) {
                Debug.assert(!asteriskToken || !!expression, "A `YieldExpression` with an asteriskToken must have an expression.");
                const node = createBaseNode(226 /* YieldExpression */);
                node.expression = expression && parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
                node.asteriskToken = asteriskToken;
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildFlags(node.asteriskToken) | 1024 /* ContainsES2015 */ | 128 /* ContainsES2018 */ | 1048576 /* ContainsYield */;
                return node;
            }
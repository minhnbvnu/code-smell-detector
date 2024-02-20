function createSpreadElement(expression) {
                const node = createBaseNode(227 /* SpreadElement */);
                node.expression = parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
                node.transformFlags |= propagateChildFlags(node.expression) | 1024 /* ContainsES2015 */ | 32768 /* ContainsRestOrSpread */;
                return node;
            }
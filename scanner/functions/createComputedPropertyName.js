function createComputedPropertyName(expression) {
                const node = createBaseNode(164 /* ComputedPropertyName */);
                node.expression = parenthesizerRules().parenthesizeExpressionOfComputedPropertyName(expression);
                node.transformFlags |= propagateChildFlags(node.expression) | 1024 /* ContainsES2015 */ | 131072 /* ContainsComputedPropertyName */;
                return node;
            }
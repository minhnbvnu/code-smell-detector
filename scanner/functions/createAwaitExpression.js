function createAwaitExpression(expression) {
                const node = createBaseNode(220 /* AwaitExpression */);
                node.expression = parenthesizerRules().parenthesizeOperandOfPrefixUnary(expression);
                node.transformFlags |= propagateChildFlags(node.expression) | 256 /* ContainsES2017 */ | 128 /* ContainsES2018 */ | 2097152 /* ContainsAwait */;
                return node;
            }
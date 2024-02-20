function createPrefixUnaryExpression(operator, operand) {
                const node = createBaseNode(221 /* PrefixUnaryExpression */);
                node.operator = operator;
                node.operand = parenthesizerRules().parenthesizeOperandOfPrefixUnary(operand);
                node.transformFlags |= propagateChildFlags(node.operand);
                if ((operator === 45 /* PlusPlusToken */ || operator === 46 /* MinusMinusToken */) && isIdentifier(node.operand) && !isGeneratedIdentifier(node.operand) && !isLocalName(node.operand)) {
                    node.transformFlags |= 268435456 /* ContainsUpdateExpressionForIdentifier */;
                }
                return node;
            }
function createPostfixUnaryExpression(operand, operator) {
                const node = createBaseNode(222 /* PostfixUnaryExpression */);
                node.operator = operator;
                node.operand = parenthesizerRules().parenthesizeOperandOfPostfixUnary(operand);
                node.transformFlags |= propagateChildFlags(node.operand);
                if (isIdentifier(node.operand) && !isGeneratedIdentifier(node.operand) && !isLocalName(node.operand)) {
                    node.transformFlags |= 268435456 /* ContainsUpdateExpressionForIdentifier */;
                }
                return node;
            }
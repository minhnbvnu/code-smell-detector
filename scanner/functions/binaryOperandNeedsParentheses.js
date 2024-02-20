function binaryOperandNeedsParentheses(binaryOperator, operand, isLeftSideOfBinary, leftOperand) {
                const binaryOperatorPrecedence = getOperatorPrecedence(223 /* BinaryExpression */, binaryOperator);
                const binaryOperatorAssociativity = getOperatorAssociativity(223 /* BinaryExpression */, binaryOperator);
                const emittedOperand = skipPartiallyEmittedExpressions(operand);
                if (!isLeftSideOfBinary && operand.kind === 216 /* ArrowFunction */ && binaryOperatorPrecedence > 3 /* Assignment */) {
                    return true;
                }
                const operandPrecedence = getExpressionPrecedence(emittedOperand);
                switch (compareValues(operandPrecedence, binaryOperatorPrecedence)) {
                    case -1 /* LessThan */:
                        if (!isLeftSideOfBinary && binaryOperatorAssociativity === 1 /* Right */ && operand.kind === 226 /* YieldExpression */) {
                            return false;
                        }
                        return true;
                    case 1 /* GreaterThan */:
                        return false;
                    case 0 /* EqualTo */:
                        if (isLeftSideOfBinary) {
                            return binaryOperatorAssociativity === 1 /* Right */;
                        }
                        else {
                            if (isBinaryExpression(emittedOperand) && emittedOperand.operatorToken.kind === binaryOperator) {
                                if (operatorHasAssociativeProperty(binaryOperator)) {
                                    return false;
                                }
                                if (binaryOperator === 39 /* PlusToken */) {
                                    const leftKind = leftOperand ? getLiteralKindOfBinaryPlusOperand(leftOperand) : 0 /* Unknown */;
                                    if (isLiteralKind(leftKind) && leftKind === getLiteralKindOfBinaryPlusOperand(emittedOperand)) {
                                        return false;
                                    }
                                }
                            }
                            const operandAssociativity = getExpressionAssociativity(emittedOperand);
                            return operandAssociativity === 0 /* Left */;
                        }
                }
            }
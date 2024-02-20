function createBinaryExpression(left, operator, right) {
                const node = createBaseDeclaration(223 /* BinaryExpression */);
                const operatorToken = asToken(operator);
                const operatorKind = operatorToken.kind;
                node.left = parenthesizerRules().parenthesizeLeftSideOfBinary(operatorKind, left);
                node.operatorToken = operatorToken;
                node.right = parenthesizerRules().parenthesizeRightSideOfBinary(operatorKind, node.left, right);
                node.transformFlags |= propagateChildFlags(node.left) | propagateChildFlags(node.operatorToken) | propagateChildFlags(node.right);
                if (operatorKind === 60 /* QuestionQuestionToken */) {
                    node.transformFlags |= 32 /* ContainsES2020 */;
                }
                else if (operatorKind === 63 /* EqualsToken */) {
                    if (isObjectLiteralExpression(node.left)) {
                        node.transformFlags |= 1024 /* ContainsES2015 */ | 128 /* ContainsES2018 */ | 4096 /* ContainsDestructuringAssignment */ | propagateAssignmentPatternFlags(node.left);
                    }
                    else if (isArrayLiteralExpression(node.left)) {
                        node.transformFlags |= 1024 /* ContainsES2015 */ | 4096 /* ContainsDestructuringAssignment */ | propagateAssignmentPatternFlags(node.left);
                    }
                }
                else if (operatorKind === 42 /* AsteriskAsteriskToken */ || operatorKind === 67 /* AsteriskAsteriskEqualsToken */) {
                    node.transformFlags |= 512 /* ContainsES2016 */;
                }
                else if (isLogicalOrCoalescingAssignmentOperator(operatorKind)) {
                    node.transformFlags |= 16 /* ContainsES2021 */;
                }
                if (operatorKind === 101 /* InKeyword */ && isPrivateIdentifier(node.left)) {
                    node.transformFlags |= 536870912 /* ContainsPrivateIdentifierInExpression */;
                }
                node.jsDoc = void 0;
                return node;
            }
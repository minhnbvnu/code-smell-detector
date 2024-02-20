function getContextualTypeForBinaryOperand(node, contextFlags) {
                const binaryExpression = node.parent;
                const { left, operatorToken, right } = binaryExpression;
                switch (operatorToken.kind) {
                    case 63 /* EqualsToken */:
                    case 76 /* AmpersandAmpersandEqualsToken */:
                    case 75 /* BarBarEqualsToken */:
                    case 77 /* QuestionQuestionEqualsToken */:
                        return node === right ? getContextualTypeForAssignmentDeclaration(binaryExpression) : void 0;
                    case 56 /* BarBarToken */:
                    case 60 /* QuestionQuestionToken */:
                        const type = getContextualType2(binaryExpression, contextFlags);
                        return node === right && (type && type.pattern || !type && !isDefaultedExpandoInitializer(binaryExpression)) ? getTypeOfExpression(left) : type;
                    case 55 /* AmpersandAmpersandToken */:
                    case 27 /* CommaToken */:
                        return node === right ? getContextualType2(binaryExpression, contextFlags) : void 0;
                    default:
                        return void 0;
                }
            }
function inferTypeFromBinaryExpression(node, parent2, usage) {
                switch (parent2.operatorToken.kind) {
                    case 42 /* AsteriskAsteriskToken */:
                    case 41 /* AsteriskToken */:
                    case 43 /* SlashToken */:
                    case 44 /* PercentToken */:
                    case 47 /* LessThanLessThanToken */:
                    case 48 /* GreaterThanGreaterThanToken */:
                    case 49 /* GreaterThanGreaterThanGreaterThanToken */:
                    case 50 /* AmpersandToken */:
                    case 51 /* BarToken */:
                    case 52 /* CaretToken */:
                    case 65 /* MinusEqualsToken */:
                    case 67 /* AsteriskAsteriskEqualsToken */:
                    case 66 /* AsteriskEqualsToken */:
                    case 68 /* SlashEqualsToken */:
                    case 69 /* PercentEqualsToken */:
                    case 73 /* AmpersandEqualsToken */:
                    case 74 /* BarEqualsToken */:
                    case 78 /* CaretEqualsToken */:
                    case 70 /* LessThanLessThanEqualsToken */:
                    case 72 /* GreaterThanGreaterThanGreaterThanEqualsToken */:
                    case 71 /* GreaterThanGreaterThanEqualsToken */:
                    case 40 /* MinusToken */:
                    case 29 /* LessThanToken */:
                    case 32 /* LessThanEqualsToken */:
                    case 31 /* GreaterThanToken */:
                    case 33 /* GreaterThanEqualsToken */:
                        const operandType = checker.getTypeAtLocation(parent2.left === node ? parent2.right : parent2.left);
                        if (operandType.flags & 1056 /* EnumLike */) {
                            addCandidateType(usage, operandType);
                        }
                        else {
                            usage.isNumber = true;
                        }
                        break;
                    case 64 /* PlusEqualsToken */:
                    case 39 /* PlusToken */:
                        const otherOperandType = checker.getTypeAtLocation(parent2.left === node ? parent2.right : parent2.left);
                        if (otherOperandType.flags & 1056 /* EnumLike */) {
                            addCandidateType(usage, otherOperandType);
                        }
                        else if (otherOperandType.flags & 296 /* NumberLike */) {
                            usage.isNumber = true;
                        }
                        else if (otherOperandType.flags & 402653316 /* StringLike */) {
                            usage.isString = true;
                        }
                        else if (otherOperandType.flags & 1 /* Any */) {
                        }
                        else {
                            usage.isNumberOrString = true;
                        }
                        break;
                    case 63 /* EqualsToken */:
                    case 34 /* EqualsEqualsToken */:
                    case 36 /* EqualsEqualsEqualsToken */:
                    case 37 /* ExclamationEqualsEqualsToken */:
                    case 35 /* ExclamationEqualsToken */:
                        addCandidateType(usage, checker.getTypeAtLocation(parent2.left === node ? parent2.right : parent2.left));
                        break;
                    case 101 /* InKeyword */:
                        if (node === parent2.left) {
                            usage.isString = true;
                        }
                        break;
                    case 56 /* BarBarToken */:
                    case 60 /* QuestionQuestionToken */:
                        if (node === parent2.left && (node.parent.parent.kind === 257 /* VariableDeclaration */ || isAssignmentExpression(node.parent.parent, 
                        /*excludeCompoundAssignment*/
                        true))) {
                            addCandidateType(usage, checker.getTypeAtLocation(parent2.right));
                        }
                        break;
                    case 55 /* AmpersandAmpersandToken */:
                    case 27 /* CommaToken */:
                    case 102 /* InstanceOfKeyword */:
                        break;
                }
            }
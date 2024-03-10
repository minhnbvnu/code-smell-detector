function getOperatorAssociativity(kind, operator, hasArguments) {
            switch (kind) {
                case 211 /* NewExpression */:
                    return hasArguments ? 0 /* Left */ : 1 /* Right */;
                case 221 /* PrefixUnaryExpression */:
                case 218 /* TypeOfExpression */:
                case 219 /* VoidExpression */:
                case 217 /* DeleteExpression */:
                case 220 /* AwaitExpression */:
                case 224 /* ConditionalExpression */:
                case 226 /* YieldExpression */:
                    return 1 /* Right */;
                case 223 /* BinaryExpression */:
                    switch (operator) {
                        case 42 /* AsteriskAsteriskToken */:
                        case 63 /* EqualsToken */:
                        case 64 /* PlusEqualsToken */:
                        case 65 /* MinusEqualsToken */:
                        case 67 /* AsteriskAsteriskEqualsToken */:
                        case 66 /* AsteriskEqualsToken */:
                        case 68 /* SlashEqualsToken */:
                        case 69 /* PercentEqualsToken */:
                        case 70 /* LessThanLessThanEqualsToken */:
                        case 71 /* GreaterThanGreaterThanEqualsToken */:
                        case 72 /* GreaterThanGreaterThanGreaterThanEqualsToken */:
                        case 73 /* AmpersandEqualsToken */:
                        case 78 /* CaretEqualsToken */:
                        case 74 /* BarEqualsToken */:
                        case 75 /* BarBarEqualsToken */:
                        case 76 /* AmpersandAmpersandEqualsToken */:
                        case 77 /* QuestionQuestionEqualsToken */:
                            return 1 /* Right */;
                    }
            }
            return 0 /* Left */;
        }
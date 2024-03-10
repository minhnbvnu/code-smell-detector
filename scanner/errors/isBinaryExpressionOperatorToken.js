function isBinaryExpressionOperatorToken(token) {
            switch (token) {
                case 41 /* AsteriskToken */:
                case 43 /* SlashToken */:
                case 44 /* PercentToken */:
                case 39 /* PlusToken */:
                case 40 /* MinusToken */:
                case 47 /* LessThanLessThanToken */:
                case 48 /* GreaterThanGreaterThanToken */:
                case 49 /* GreaterThanGreaterThanGreaterThanToken */:
                case 29 /* LessThanToken */:
                case 31 /* GreaterThanToken */:
                case 32 /* LessThanEqualsToken */:
                case 33 /* GreaterThanEqualsToken */:
                case 102 /* InstanceOfKeyword */:
                case 101 /* InKeyword */:
                case 128 /* AsKeyword */:
                case 150 /* SatisfiesKeyword */:
                case 34 /* EqualsEqualsToken */:
                case 35 /* ExclamationEqualsToken */:
                case 36 /* EqualsEqualsEqualsToken */:
                case 37 /* ExclamationEqualsEqualsToken */:
                case 50 /* AmpersandToken */:
                case 52 /* CaretToken */:
                case 51 /* BarToken */:
                case 55 /* AmpersandAmpersandToken */:
                case 56 /* BarBarToken */:
                case 74 /* BarEqualsToken */:
                case 73 /* AmpersandEqualsToken */:
                case 78 /* CaretEqualsToken */:
                case 70 /* LessThanLessThanEqualsToken */:
                case 71 /* GreaterThanGreaterThanEqualsToken */:
                case 72 /* GreaterThanGreaterThanGreaterThanEqualsToken */:
                case 64 /* PlusEqualsToken */:
                case 65 /* MinusEqualsToken */:
                case 66 /* AsteriskEqualsToken */:
                case 68 /* SlashEqualsToken */:
                case 69 /* PercentEqualsToken */:
                case 63 /* EqualsToken */:
                case 27 /* CommaToken */:
                case 60 /* QuestionQuestionToken */:
                case 75 /* BarBarEqualsToken */:
                case 76 /* AmpersandAmpersandEqualsToken */:
                case 77 /* QuestionQuestionEqualsToken */:
                    return true;
                default:
                    return false;
            }
        }
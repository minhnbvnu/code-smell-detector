function getNonAssignmentOperatorForCompoundAssignment(kind) {
            switch (kind) {
                case 64 /* PlusEqualsToken */:
                    return 39 /* PlusToken */;
                case 65 /* MinusEqualsToken */:
                    return 40 /* MinusToken */;
                case 66 /* AsteriskEqualsToken */:
                    return 41 /* AsteriskToken */;
                case 67 /* AsteriskAsteriskEqualsToken */:
                    return 42 /* AsteriskAsteriskToken */;
                case 68 /* SlashEqualsToken */:
                    return 43 /* SlashToken */;
                case 69 /* PercentEqualsToken */:
                    return 44 /* PercentToken */;
                case 70 /* LessThanLessThanEqualsToken */:
                    return 47 /* LessThanLessThanToken */;
                case 71 /* GreaterThanGreaterThanEqualsToken */:
                    return 48 /* GreaterThanGreaterThanToken */;
                case 72 /* GreaterThanGreaterThanGreaterThanEqualsToken */:
                    return 49 /* GreaterThanGreaterThanGreaterThanToken */;
                case 73 /* AmpersandEqualsToken */:
                    return 50 /* AmpersandToken */;
                case 74 /* BarEqualsToken */:
                    return 51 /* BarToken */;
                case 78 /* CaretEqualsToken */:
                    return 52 /* CaretToken */;
                case 75 /* BarBarEqualsToken */:
                    return 56 /* BarBarToken */;
                case 76 /* AmpersandAmpersandEqualsToken */:
                    return 55 /* AmpersandAmpersandToken */;
                case 77 /* QuestionQuestionEqualsToken */:
                    return 60 /* QuestionQuestionToken */;
            }
        }
function getSuggestedBooleanOperator(operator2) {
                    switch (operator2) {
                        case 51 /* BarToken */:
                        case 74 /* BarEqualsToken */:
                            return 56 /* BarBarToken */;
                        case 52 /* CaretToken */:
                        case 78 /* CaretEqualsToken */:
                            return 37 /* ExclamationEqualsEqualsToken */;
                        case 50 /* AmpersandToken */:
                        case 73 /* AmpersandEqualsToken */:
                            return 55 /* AmpersandAmpersandToken */;
                        default:
                            return void 0;
                    }
                }
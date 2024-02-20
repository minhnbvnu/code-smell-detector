function isPrefixUnaryExpressionOperatorToken(token) {
            switch (token) {
                case 39 /* PlusToken */:
                case 40 /* MinusToken */:
                case 54 /* TildeToken */:
                case 53 /* ExclamationToken */:
                case 45 /* PlusPlusToken */:
                case 46 /* MinusMinusToken */:
                    return true;
                default:
                    return false;
            }
        }
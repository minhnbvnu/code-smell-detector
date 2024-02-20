function isStartOfExpression() {
                        if (isStartOfLeftHandSideExpression()) {
                            return true;
                        }
                        switch (token()) {
                            case 39 /* PlusToken */:
                            case 40 /* MinusToken */:
                            case 54 /* TildeToken */:
                            case 53 /* ExclamationToken */:
                            case 89 /* DeleteKeyword */:
                            case 112 /* TypeOfKeyword */:
                            case 114 /* VoidKeyword */:
                            case 45 /* PlusPlusToken */:
                            case 46 /* MinusMinusToken */:
                            case 29 /* LessThanToken */:
                            case 133 /* AwaitKeyword */:
                            case 125 /* YieldKeyword */:
                            case 80 /* PrivateIdentifier */:
                            case 59 /* AtToken */:
                                return true;
                            default:
                                if (isBinaryOperator2()) {
                                    return true;
                                }
                                return isIdentifier2();
                        }
                    }
function isUpdateExpression() {
                        switch (token()) {
                            case 39 /* PlusToken */:
                            case 40 /* MinusToken */:
                            case 54 /* TildeToken */:
                            case 53 /* ExclamationToken */:
                            case 89 /* DeleteKeyword */:
                            case 112 /* TypeOfKeyword */:
                            case 114 /* VoidKeyword */:
                            case 133 /* AwaitKeyword */:
                                return false;
                            case 29 /* LessThanToken */:
                                if (languageVariant !== 1 /* JSX */) {
                                    return false;
                                }
                            default:
                                return true;
                        }
                    }
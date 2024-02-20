function isBinaryOperator2() {
                        if (inDisallowInContext() && token() === 101 /* InKeyword */) {
                            return false;
                        }
                        return getBinaryOperatorPrecedence(token()) > 0;
                    }
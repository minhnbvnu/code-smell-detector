function isAwaitExpression2() {
                        if (token() === 133 /* AwaitKeyword */) {
                            if (inAwaitContext()) {
                                return true;
                            }
                            return lookAhead(nextTokenIsIdentifierOrKeywordOrLiteralOnSameLine);
                        }
                        return false;
                    }
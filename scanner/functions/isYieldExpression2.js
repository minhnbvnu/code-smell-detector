function isYieldExpression2() {
                        if (token() === 125 /* YieldKeyword */) {
                            if (inYieldContext()) {
                                return true;
                            }
                            return lookAhead(nextTokenIsIdentifierOrKeywordOrLiteralOnSameLine);
                        }
                        return false;
                    }
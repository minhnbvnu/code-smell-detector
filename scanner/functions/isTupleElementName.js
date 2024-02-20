function isTupleElementName() {
                        if (token() === 25 /* DotDotDotToken */) {
                            return tokenIsIdentifierOrKeyword(nextToken()) && isNextTokenColonOrQuestionColon();
                        }
                        return tokenIsIdentifierOrKeyword(token()) && isNextTokenColonOrQuestionColon();
                    }
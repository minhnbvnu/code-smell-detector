function isStartOfOptionalPropertyOrElementAccessChain() {
                        return token() === 28 /* QuestionDotToken */ && lookAhead(nextTokenIsIdentifierOrKeywordOrOpenBracketOrTemplate);
                    }
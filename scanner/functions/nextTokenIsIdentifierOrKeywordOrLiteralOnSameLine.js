function nextTokenIsIdentifierOrKeywordOrLiteralOnSameLine() {
                        nextToken();
                        return (tokenIsIdentifierOrKeyword(token()) || token() === 8 /* NumericLiteral */ || token() === 9 /* BigIntLiteral */ || token() === 10 /* StringLiteral */) && !scanner2.hasPrecedingLineBreak();
                    }
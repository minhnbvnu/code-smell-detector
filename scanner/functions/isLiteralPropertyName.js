function isLiteralPropertyName() {
                        return tokenIsIdentifierOrKeyword(token()) || token() === 10 /* StringLiteral */ || token() === 8 /* NumericLiteral */;
                    }
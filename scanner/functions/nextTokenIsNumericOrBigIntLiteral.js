function nextTokenIsNumericOrBigIntLiteral() {
                        nextToken();
                        return token() === 8 /* NumericLiteral */ || token() === 9 /* BigIntLiteral */;
                    }
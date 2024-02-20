function isStartOfFunctionTypeOrConstructorType() {
                        if (token() === 29 /* LessThanToken */) {
                            return true;
                        }
                        if (token() === 20 /* OpenParenToken */ && lookAhead(isUnambiguouslyStartOfFunctionType)) {
                            return true;
                        }
                        return token() === 103 /* NewKeyword */ || token() === 126 /* AbstractKeyword */ && lookAhead(nextTokenIsNewKeyword);
                    }
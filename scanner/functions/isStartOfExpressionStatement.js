function isStartOfExpressionStatement() {
                        return token() !== 18 /* OpenBraceToken */ && token() !== 98 /* FunctionKeyword */ && token() !== 84 /* ClassKeyword */ && token() !== 59 /* AtToken */ && isStartOfExpression();
                    }
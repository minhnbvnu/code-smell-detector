function isStartOfParenthesizedOrFunctionType() {
                        nextToken();
                        return token() === 21 /* CloseParenToken */ || isStartOfParameter(
                        /*isJSDocParameter*/
                        false) || isStartOfType();
                    }
function parseJSDocUnknownOrNullableType() {
                        const pos = getNodePos();
                        nextToken();
                        if (token() === 27 /* CommaToken */ || token() === 19 /* CloseBraceToken */ || token() === 21 /* CloseParenToken */ || token() === 31 /* GreaterThanToken */ || token() === 63 /* EqualsToken */ || token() === 51 /* BarToken */) {
                            return finishNode(factory2.createJSDocUnknownType(), pos);
                        }
                        else {
                            return finishNode(factory2.createJSDocNullableType(parseType(), 
                            /*postfix*/
                            false), pos);
                        }
                    }
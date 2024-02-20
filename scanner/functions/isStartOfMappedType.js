function isStartOfMappedType() {
                        nextToken();
                        if (token() === 39 /* PlusToken */ || token() === 40 /* MinusToken */) {
                            return nextToken() === 146 /* ReadonlyKeyword */;
                        }
                        if (token() === 146 /* ReadonlyKeyword */) {
                            nextToken();
                        }
                        return token() === 22 /* OpenBracketToken */ && nextTokenIsIdentifier() && nextToken() === 101 /* InKeyword */;
                    }
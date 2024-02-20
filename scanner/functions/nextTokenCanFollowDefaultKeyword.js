function nextTokenCanFollowDefaultKeyword() {
                        nextToken();
                        return token() === 84 /* ClassKeyword */ || token() === 98 /* FunctionKeyword */ || token() === 118 /* InterfaceKeyword */ || token() === 59 /* AtToken */ || token() === 126 /* AbstractKeyword */ && lookAhead(nextTokenIsClassKeywordOnSameLine) || token() === 132 /* AsyncKeyword */ && lookAhead(nextTokenIsFunctionKeywordOnSameLine);
                    }
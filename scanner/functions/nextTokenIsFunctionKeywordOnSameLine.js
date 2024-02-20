function nextTokenIsFunctionKeywordOnSameLine() {
                        nextToken();
                        return token() === 98 /* FunctionKeyword */ && !scanner2.hasPrecedingLineBreak();
                    }
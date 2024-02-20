function nextTokenIsClassKeywordOnSameLine() {
                        nextToken();
                        return token() === 84 /* ClassKeyword */ && !scanner2.hasPrecedingLineBreak();
                    }
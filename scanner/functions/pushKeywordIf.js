function pushKeywordIf(keywordList, token, ...expected) {
                        if (token && contains(expected, token.kind)) {
                            keywordList.push(token);
                            return true;
                        }
                        return false;
                    }
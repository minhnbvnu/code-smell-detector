function parseSemicolon() {
                        return tryParseSemicolon() || parseExpected(26 /* SemicolonToken */);
                    }
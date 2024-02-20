function tryParseSemicolon() {
                        if (!canParseSemicolon()) {
                            return false;
                        }
                        if (token() === 26 /* SemicolonToken */) {
                            nextToken();
                        }
                        return true;
                    }
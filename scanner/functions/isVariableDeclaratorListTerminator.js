function isVariableDeclaratorListTerminator() {
                        if (canParseSemicolon()) {
                            return true;
                        }
                        if (isInOrOfKeyword(token())) {
                            return true;
                        }
                        if (token() === 38 /* EqualsGreaterThanToken */) {
                            return true;
                        }
                        return false;
                    }
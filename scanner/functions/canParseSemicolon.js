function canParseSemicolon() {
                        if (token() === 26 /* SemicolonToken */) {
                            return true;
                        }
                        return token() === 19 /* CloseBraceToken */ || token() === 1 /* EndOfFileToken */ || scanner2.hasPrecedingLineBreak();
                    }
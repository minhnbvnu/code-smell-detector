function isValidHeritageClauseObjectLiteral() {
                        Debug.assert(token() === 18 /* OpenBraceToken */);
                        if (nextToken() === 19 /* CloseBraceToken */) {
                            const next = nextToken();
                            return next === 27 /* CommaToken */ || next === 18 /* OpenBraceToken */ || next === 94 /* ExtendsKeyword */ || next === 117 /* ImplementsKeyword */;
                        }
                        return true;
                    }
function isImplementsClause() {
                        return token() === 117 /* ImplementsKeyword */ && lookAhead(nextTokenIsIdentifierOrKeyword);
                    }
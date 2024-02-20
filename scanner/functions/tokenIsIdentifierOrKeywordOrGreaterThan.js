function tokenIsIdentifierOrKeywordOrGreaterThan(token) {
            return token === 31 /* GreaterThanToken */ || tokenIsIdentifierOrKeyword(token);
        }
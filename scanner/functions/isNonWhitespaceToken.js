function isNonWhitespaceToken(n) {
            return isToken(n) && !isWhiteSpaceOnlyJsxText(n);
        }
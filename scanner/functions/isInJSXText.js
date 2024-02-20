function isInJSXText(sourceFile, position) {
            const token = getTokenAtPosition(sourceFile, position);
            if (isJsxText(token)) {
                return true;
            }
            if (token.kind === 18 /* OpenBraceToken */ && isJsxExpression(token.parent) && isJsxElement(token.parent.parent)) {
                return true;
            }
            if (token.kind === 29 /* LessThanToken */ && isJsxOpeningLikeElement(token.parent) && isJsxElement(token.parent.parent)) {
                return true;
            }
            return false;
        }